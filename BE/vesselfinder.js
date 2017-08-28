var request = require('request');
var rosh_hanikra = [33.094099, 35.103982];
var gaza = [31.323499, 34.218753];

function add_d_nmiles_to_lat(d, lat) {
    // 1 lat_degree = 110.574 km = 59.70518359 nm
    return lat + d/59.70518359;
}

function add_d_nmiles_to_lon(d, lat, lon) {
    // 1 lon_degree = 111.320*cos(lat* (Math.PI / 180)) km = 60.1079914*cos(lat* (Math.PI / 180)) nm
    return lon + d/(60.1079914*Math.cos(lat*(Math.PI/180)));
}

function calculate_square_str(distance){
    left = add_d_nmiles_to_lat(-distance, gaza[0])
    bottom = add_d_nmiles_to_lon(-distance, left, gaza[1])

    right = add_d_nmiles_to_lat(distance, rosh_hanikra[0])
    top = add_d_nmiles_to_lon(distance, right, rosh_hanikra[1])

    return bottom + '%2C' + left + '%2C' + top + '%2C' + right;
}

function vf_init(){
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
            } else {
                console.error('VesselFinder: Initializing... Error ');
                console.error(error);
            }
        }
    );
}

function vf_get_all_ships(distance, callback){
    console.log('Finding ships in '+calculate_square_str(distance).replace(/%2C/gi, " "));
    request.get(
        'https://www.vesselfinder.com/vesselsonmap?bbox='+ calculate_square_str(distance) +'&zoom=7&pv=6',
        {
            headers: {
                'User-Agent': 'PostmanRuntime/6.2.5',
                'X-Requested-With': 'XMLHttpRequest'
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

function vf_find_ship(mmsi, callback){
    // https://www.vesselfinder.com/clickinfo?mmsi=667001498
    request.get(
        'https://www.vesselfinder.com/clickinfo?mmsi='+mmsi,
        {
            headers: {
                'User-Agent': 'PostmanRuntime/6.2.5',
                'X-Requested-With': 'XMLHttpRequest'
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

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

/*
 The callback is performed on every IMO separately!
*/
function vf_get_all_imos_by_distance(distance, callback){
    vf_init();
    vf_get_all_ships(distance, function(mmsi_array){
        for (var i=0; i<mmsi_array.length; i++){
            vf_find_ship(mmsi_array[i], function(vessel) {
                var obj = JSON.parse(vessel);
                if (obj.imo == null || obj.imo == '') {
                    // vessel doesn't have imo
                } else {
                    // vessel has imo, do something
                    callback(obj.imo)
                }
            });
        }
    });
}

vf_get_all_imos_by_distance(0, console.log)
