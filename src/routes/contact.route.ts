import express from 'express';
import ContactUsController from '../controllers/contactController';
import { EmailSender } from '../config/email.sender';
import nodemailer, { Transporter } from 'nodemailer';
require('dotenv').config();

const router = express.Router();

// Create a transporter instance
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Create an instance of EmailSender and pass the transporter
const emailSender = new EmailSender(transporter);

// Create an instance of ContactUsController and pass the emailSender
const contactUsController = new ContactUsController(emailSender);

router.post('/', contactUsController.create);

export default router;