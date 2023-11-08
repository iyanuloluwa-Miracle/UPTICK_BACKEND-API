import { Request, Response } from "express";
import config from "../config/config";
import transporter from "../config/mailer";

class MailController {
  static async sendMail(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, email, message } = req.body;
    // Validate request data
    if (!firstName) {
      res.status(400).json({ error: "First name is required." });
      return;
    }
    if (!lastName) {
      res.status(400).json({ error: "Last name is required." });
      return;
    }
    if (!email) {
      res.status(400).json({ error: "Email is required." });
      return;
    }
    if (!message) {
      res.status(400).json({ error: "Message is required." });
      return;
    }

    const mailOptions = {
      from: config.mail.user,
      to: config.mail.contact,
      subject: "New Contact Request",
      text: `
        You have a new contact request from:
        Name: ${firstName} ${lastName}
        Email: ${email}
        Message: ${message}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res
        .status(200)
        .json({ success: true, message: "Email sent successfully." });
    } catch (error) {
      res.status(500).json({ error: "Error sending email." });
    }
  }
}

export default MailController;
