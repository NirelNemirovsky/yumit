var request = require('request')

module.exports = {
	AddPhoneNumToAlert: function (phoneNumber) {

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
	},

	RemovePhoneNumFromAlert: function (phoneNumber) {

		// GOOD LUCK
		var encodedPhoneNumber = encodeURIComponent(phoneNumber)
		request.post(
			'http://localhost:64695/api/Sms/UnRegisterPhoneNumber?phoneNumber=' + encodedPhoneNumber,
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
	},

	SendMessage: function (message) {

		// GOOD LUCK
		var encodedMessage = encodeURIComponent(message)
		request.post(
			'http://localhost:64695/api/Sms/SendSms?message=' + encodedMessage,
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

};
