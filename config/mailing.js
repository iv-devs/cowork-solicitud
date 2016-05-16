var mailing_config = {
	'sendgrid_key' : process.env.SENDGRIDKEY || 'api-key',
	'sendgrid_user' : process.env.SENDGRIDUSER || 'username',
	'sendgrid_pass' : process.env.SENDGRIDPASS || 'password',
	'default_mail' : process.env.DEFAULT_MAIL || 'mail@domain.com',
	'default_name' : process.env.DEFAULT_NAME || 'default name'
};

module.exports = mailing_config;
