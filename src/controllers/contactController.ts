// controllers/ContactUsController.ts

import { Request, Response } from "express";
import ContactFormSubmission from "../models/ContactFormSubmission";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

class ContactUsController {
  static async submitForm(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, phone, message } = req.body;

      // Validate input (you may want to add more validation)
      if (!name || !email || !phone || !message) {
        res
          .status(400)
          .json({ error: "Name, email, phone, and message are required" });
        return;
      }

      // Save to database using Sequelize
      const submission = await ContactFormSubmission.create({
        name,
        email,
        phone,
        message,
      });

      // Send email using Nodemailer
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER || "", // Using environment variables
          pass: process.env.EMAIL_PASSWORD || "", // Using environment variables
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER || "", // Using environment variables
        to: "iyanudina@gmail.com", // Replace with your admin email
        subject: "New Contact Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: "Failed to send email" });
          return;
        }

        console.log("Email sent: " + info.response);

        // Send success response without id
        res.status(200).json({
          message: "Form submitted successfully",
          submission: {
            name: submission.name,
            email: submission.email,
            phone: submission.phone,
            message: submission.message,
          },
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  }
}

export default ContactUsController;
