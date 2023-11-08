import nodemailer from "nodemailer";
import config from "./config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: config.mail.user,
    pass: config.mail.pass,
  },
});

export default transporter;
