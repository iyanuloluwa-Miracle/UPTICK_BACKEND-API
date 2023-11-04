import { Request, Response } from "express";
import Applicant, { ApplicantAttributes } from "../models/applicant";


class ApplicantController {
  static async application(req: Request, res: Response): Promise<void> {
    const { 
      firstName, lastName, email,
      address, applicationDate, phone, resumeFile, status
    } = req.body as ApplicantAttributes;

    const applicant = await Applicant.create({
      firstName, lastName, email, address, phone, resumeFile,
      applicationDate: new Date(applicationDate), status
    });

    console.log(applicant.firstName);

    res.json({ message: "success" });
    return;
  }
}

export default ApplicantController;
