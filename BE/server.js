var smsService = require('./smsService.js');
var vesselfinder = require('./vesselfinder.js')
var cron = require('node-cron');

function subscribe_to_get_ships(phoneNumber, distance, countries) {
    console.log('Subscribing:', phoneNumber, distance, countries);
    smsService.AddPhoneNumToAlert(phoneNumber);
    cron.schedule('* * * * *', function() {
        vesselfinder.get_ships(distance, function(ship) {
            for (var i=0; i<countries.length; i++){
                if (countries[i] == ship['country']){
                    console.log('Sending message to ' + phoneNumber);
                    smsService.SendMessage(ship);
                }
            }
        });
    });
}
// subscribe_to_get_ships("", 10, ['Turkey', 'Portugal']);

const http = require('http');

const hostname = '127.0.0.1';
const port = 3456;

const server = http.createServer((req, res) => {
    console.log(req);
    if (req.method == 'POST') {
        var body = "";
        req.on('data', function(chunk) {
            body += chunk;
        });
        req.on('end', function() {
            console.log('body: ' + body);
            var jsonObj = JSON.parse(body);
            subscribe_to_get_ships(jsonObj[phoneNumber], jsonObj[distance], jsonObj[countries]);
        })
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
    }
});

server.listen(port, hostname, () => {
    console.log(`Itay's Server is running at http://${hostname}:${port}/`);
});
