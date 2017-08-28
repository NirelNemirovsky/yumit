var request = require('request');

function vf_init(){
    request.get(
        'http://www.google.com/',
        { json: { key: 'value' } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        }
    );
}
