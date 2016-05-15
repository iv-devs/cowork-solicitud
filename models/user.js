var mongoose = require('mongoose');

module.exports = mongoose.model('user',
	{
		id: String,
		username: String,
		password: String,
		email: String,
		firstName: String,
		lastName: String,
		organization: String,
		phone: String,
		rol: String
	});
