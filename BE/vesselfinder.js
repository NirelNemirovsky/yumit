var request = require('request');
var dbfunc = require('./DBFunctions.js');

var sleep = require('system-sleep')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var rosh_hanikra = [33.094099, 35.103982];
var gaza = [31.323499, 34.218753];
const eps = 0.5;

var eq_ssid = null;

function add_d_nmiles_to_lat(d, lat) {
    // 1 lat_degree = 110.574 km = 59.70518359 nm
    // latitude = y axis
    // console.log('prev_lat =', lat, ';', 'delta =', d/59.70518359, ';', 'result =',lat + d/59.70518359);
    return lat + d/59.70518359;
}

function add_d_nmiles_to_lon(d, lat, lon) {
    // 1 lon_degree = 111.320*cos(lat* (Math.PI / 180)) km = 60.1079914*cos(lat* (Math.PI / 180)) nm
    // longitude = x axis
    return lon + d/(60.1079914*Math.cos(lat*(Math.PI/180)));
}

function calculate_square_str(distance){
    var bottom = add_d_nmiles_to_lat(-distance*0.6, gaza[0])
    var left = add_d_nmiles_to_lon(-distance*(1+1.4141), bottom, gaza[1])

    var top = add_d_nmiles_to_lat(distance*1.4, rosh_hanikra[0])
    var right = add_d_nmiles_to_lon((1-1.4141)*distance, top, rosh_hanikra[1])

    // console.log(left + ', ' + bottom + '\t' + right + ', ' + top);

    var slope = (top - bottom) / (right - left);
    var step = slope * eps;
    var current_x = left-step;
    var current_y = bottom-step;

    var i=0;
    var lst = [];
    while (current_x < right || current_y < top) {
        current_x += 2*step;
        current_y += 2*step;
        lst[i++] = (current_y-step) + '%2C' + (current_x-step) + '%2C' + (current_y+step) + '%2C' + (current_x+step);
    }

    return lst;
}

function vf_init(callback){
    request.get(
        'https://www.vesselfinder.com/',
        {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36'
            }
        },
        function (error, response, body) {
            if (!error && response != null && response.statusCode == 200) {
                // console.log('VesselFinder: Initializing... Done!');
                // console.log(body);
                var cookies = response.headers['set-cookie'][0];
                // console.log(cookies);
                var tmp_ssid = cookies.substring(cookies.indexOf('PHPSESSID=') + 'PHPSESSID='.length);
                tmp_ssid = tmp_ssid.substring(0,tmp_ssid.indexOf(';'));
                // console.log(ssid)
                vf_ssid = tmp_ssid;
                // console.log(vf_ssid);
                callback();
            } else {
                console.error('VesselFinder: Initializing... Error ');
                console.error(error);
            }
        }
    );
}

function vf_get_all_ships(distance, callback){
    // console.log('Finding ships in '+calculate_square_str(distance).replace(/%2C/gi, " "));
    var lst = calculate_square_str(distance);
    // console.log(lst);
    // return;
    for (var j=0; j<lst.length; j++){
        // sleep(Math.floor(Math.random() * 5) * 1000);
        request.get(
            'https://www.vesselfinder.com/vesselsonmap?bbox='+ lst[j] +'&zoom=7&pv=6',
            {
                headers: {
                    'User-Agent': 'PostmanRuntime/6.2.5',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Cookie': 'PHPSESSID='+vf_ssid+';'
                }
            },
            function (error, response, body) {
                if (!error && response != null && response.statusCode == 200) {
                    var mmsi_array = [];
                    var rows = body.split(/\n/);
                    for (var i=1; i<rows.length; i++) {
                        // if (i==1){
                        //     console.log(rows[i].split(/(\s+)/))
                        //     break
                        // }
                        mmsi_array[i-1] = rows[i].split(/(\s+)/)[10];
                    }
                    // console.log('VesselFinder: GetAllShips... Done!');
                    // console.log(col.join(', '));
                    callback(mmsi_array);
                } else {
                    console.error('VesselFinder: GetAllShips... Error ');
                    console.error(error);
                }
            }
        );
    }
}

function vf_find_ship(mmsi, callback){
    // sleep(Math.floor(Math.random() * 5) * 1000);
    // https://www.vesselfinder.com/clickinfo?mmsi=667001498
    request.get(
        'https://www.vesselfinder.com/clickinfo?mmsi='+mmsi,
        {
            headers: {
                'User-Agent': 'PostmanRuntime/6.2.5',
                'X-Requested-With': 'XMLHttpRequest',
                'Cookie': 'PHPSESSID='+vf_ssid+';'
            }
        },
        function (error, response, body) {
            if (!error && response != null && response.statusCode == 200) {
                // console.log(body);
                callback(body);
            } else {
                console.error('VesselFinder: GetAllShips... Error ');
                console.error(error);
            }
        }
    );
}

/*
 The callback is performed on every IMO separately!
*/
function vf_get_all_ships_by_distance(distance, callback){
    vf_init(function(){
        vf_get_all_ships(distance, function(mmsi_array){
            for (var i=0; i<mmsi_array.length; i++){
                vf_find_ship(mmsi_array[i], function(vessel) {
                    var obj = JSON.parse(vessel);
                    if (obj.imo == null || obj.imo == '') {
                        // vessel doesn't have imo
                    } else {
                        // vessel has imo, do something
                        eq_get_flag(obj.imo, obj, callback);
                    }
                });
            }
        });
    });
}

function eq_login(callback){
    request.post(
        'http://www.equasis.org/EquasisWeb/authen/HomePage?fs=HomePage',
        {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36'
            },
            form: {
                j_email: 'eran.gil2@gmail.com',
                j_password: '1234567',
                submit: 'Login'
              }
        },
        function (error, response, body) {
            if (!error && response != null && response.statusCode == 200) {
                // console.log('VesselFinder: Initializing... Done!');
                var cookies = response.headers['set-cookie'][0];
                var tmp_ssid = cookies.substring(cookies.indexOf('JSESSIONID=') + 'JSESSIONID='.length);
                tmp_ssid = tmp_ssid.substring(0,tmp_ssid.indexOf(';'));
                // console.log(ssid)
                eq_ssid = tmp_ssid;
                // console.log(body);
                callback();
            } else {
                console.error('VesselFinder: Initializing... Error ');
                console.error(error);
            }
        }
    );
}

function eq_get_flag(imo, obj, callback){
    request.post(
        'http://www.equasis.org/EquasisWeb/restricted/Search?fs=search',
        {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
                'Cookie': 'JSESSIONID='+eq_ssid
            },
            form: {
                // P_PAGE=1&P_PAGE_COMP=1&P_PAGE_SHIP=1&P_ENTREE_HOME=9561863&P_ENTREE_HOME_HIDDEN=9561863&checkbox-ship=Ship&advancedSearch=
                P_PAGE: '1',
                P_PAGE_COMP: '1',
                P_PAGE_SHIP: '1',
                P_ENTREE_HOME: ''+imo,
                P_ENTREE_HOME_HIDDEN: ''+imo,
                // 'checkbox-ship': 'Ship',
                advancedSearch: ''
              }
        },
        function (error, response, body) {
            if (!error && response != null && response.statusCode == 200) {
                // console.log('VesselFinder: Search... Done!');
                try {
                    const dom = new JSDOM(body);
                    var country = dom.window.document.getElementById('resultShip').getElementsByTagName('tbody')[0].getElementsByTagName('td')[4].innerHTML.trim().replace(/\s+/gi, ' ');
                    country = country.substring(0, country.indexOf('(')).trim();
                    obj['country'] = country;
                    delete obj['t'];
                    delete obj['sar'];
                    delete obj['__id'];
                    delete obj['pn'];
                    delete obj['vo'];
                    delete obj['ff'];
                    delete obj['direct_link'];
                    delete obj['draught'];
                    delete obj['dw'];
                    callback(obj);
                } catch(err) {}
            } else {
                console.error('VesselFinder: Search... Error ');
                console.error(error);
            }
        }
    );
}




module.exports = {
    get_ships: function (distance, callback){
        eq_login(function() {
            vf_get_all_ships_by_distance(distance, callback);
        });
    }
};
// 
// eq_login(function() {
//     vf_get_all_ships_by_distance(10, console.log);
// });

// while(eq_ssid == null);
