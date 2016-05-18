var mailing = require('../config/mailing');
var sendgrid  = require('sendgrid')(mailing.sendgrid_user, mailing.sendgrid_pass);
var email = new sendgrid.Email();
var Mail = function () {};

Mail.prototype.send = function (fromName, from, to, subject, body, callback ) {
  console.log("Sending with SendGrid");

  email.to        = to        || mailing.default_mail;
  email.from      = from      || mailing.default_mail;
  email.fromname  = fromName  || mailing.default_name;
  email.subject   = subject;
  email.html      = body;

  sendgrid.send(email, function (err, json) {
    console.info("SENT");
    return callback(err, json);
  });
};
exports.Mail = new Mail();
