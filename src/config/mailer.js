const nodemailer = require('nodemailer');
const config = require('./config');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: config.mail.user,
    pass: config.mail.pass,
    clientId: config.mail.client,
    clientSecret: config.mail.secret,
    refreshToken: config.mail.refresh,
  },
});

module.exports = transporter;
