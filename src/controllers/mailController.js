const config = require('../config/config');

class MailController {
  static async sendMail(req, res) {
    const { firstName, lastName, email, message } = req.body;
    // Validate request data
    if (!firstName) {
      return res.status(400).json({ error: 'First name is required.' });
    }
    if (!lastName) {
      return res.status(400).json({ error: 'Last name is required.' });
    }
    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }
    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const mailOptions = {
      from: config.mail.user,
      to: config.mail.contact,
      subject: 'New Contact Request',
      text: `
        You have a new contact request from:
        Name: ${firstName} ${lastName}
        Email: ${email}
        Message: ${message}
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ success: true, "message": 'Email sent successfully.' });
    } catch (error) {
      return res.status(500).json({ error: 'Error sending email.' });
    }
  }
}

module.exports = MailController;