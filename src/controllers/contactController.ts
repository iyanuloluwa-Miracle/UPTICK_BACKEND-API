// src/controllers/ContactUsController.ts
import { Request, Response } from 'express';
import ContactUs from '../models/contactUsForm.model';
import { EmailSender } from '../config/email.sender';

class ContactUsController {
  private emailSender: EmailSender;

  constructor(emailSender: EmailSender) {
    this.emailSender = emailSender;
  }

  async create(req: Request, res: Response): Promise<void> {
    const { name, email, phone, description } = req.body;

    try {
      const contact = await ContactUs.create({
        name,
        email,
        phone,
        description,
      });

      // Send email to admin
      await this.emailSender.sendEmail({
        to: 'hey@upticktalent.com', // replace with your admin's email
        subject: 'New Contact Us Form Submission',
        text: `
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          Description: ${description}
        `,
      });

      res.status(201).json(contact);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default ContactUsController;
