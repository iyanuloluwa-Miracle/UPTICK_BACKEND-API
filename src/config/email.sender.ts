import { Transporter } from 'nodemailer';

export class EmailSender {
  private transporter: Transporter;

  constructor(transporter: Transporter) {
    this.transporter = transporter;
  }

  async sendEmail(email: { to: string; subject: string; text: string }) {
    try {
      await this.transporter.sendMail(email);
    } catch (error) {
      throw new Error(`Failed to send email: ${error}`);
    }
  }
}