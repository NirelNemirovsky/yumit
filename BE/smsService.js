var request = require('request')

function AddPepoleToAlert(phoneNumber) {

	// GOOD LUCK
	var encodedPhoneNumber = encodeURIComponent(phoneNumber)
	request.post(
		'http://localhost:64695/api/Sms/RegisterPhoneNumber?phoneNumber=' + encodedPhoneNumber,
		{
		},
		function (error, response, body) {
			if (!error && response != null && response.statusCode == 200) {
				// here you do something with your result
			} else {
				console.error('Error!');
				console.error(error);
			}
		}
	);
}
AddPepoleToAlert('+972544627555');