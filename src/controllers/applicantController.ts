import { Request, Response } from "express";
import { Applicant } from "../models";
import { ApplicantAttributes } from "../models/applicant";

class ApplicantController {
  static async createApplication(req: Request, res: Response): Promise<void> {
    try {
      // Get programId from URL parameters
      const { programId } = req.params;

      // Destructure applicant details from req.body
      const {
        firstName,
        lastName,
        email,
        phone,
        address,
        resumeFile,
        // No need to destructure applicationDate and status as they can be set by default
      } = req.body as Omit<
        ApplicantAttributes,
        "applicantId" | "programId" | "jobId" | "applicationDate" | "status"
      >;

      // Validate programId and other necessary fields
      if (!programId || !firstName || !lastName || !email) {
        res.status(400).json({ message: "Required fields are missing" });
        return;
      }

      // Create new applicant
      const newApplicant = await Applicant.create({
        programId,
        firstName,
        lastName,
        email,
        phone,
        address,
        resumeFile,
        applicationDate: new Date(), // Set applicationDate to current date
        status: "Pending", // Set status to Pending by default
      });

      // Send success response
      res.status(201).json({
        message: "Application submitted successfully",
        applicant: newApplicant,
      });
    } catch (error) {
      // Log the error (optional)
      console.error(error);

      // Send error response
      res.status(500).json({
        message: "An error occurred while submitting the application",
      });
    }
  }

  // endpoint to create a new applicant based on the jobID
  static async applyForJob(req: Request, res: Response): Promise<void> {
    try {
      // Get jobId from URL parameters
      const { jobId } = req.params;

      // Destructure applicant details from req.body
      const {
        firstName,
        lastName,
        email,
        phone,
        address,
        resumeFile,
        // No need to destructure applicationDate and status as they can be set by default
      } = req.body as Omit<
        ApplicantAttributes,
        "applicantId" | "programId" | "jobId" | "applicationDate" | "status"
      >;

      // Validate jobId and other necessary fields
      if (!jobId || !firstName || !lastName || !email) {
        res.status(400).json({ message: "Required fields are missing" });
        return;
      }

      // Create new applicant
      const newApplicant = await Applicant.create({
        jobId,
        firstName,
        lastName,
        email,
        phone,
        address,
        resumeFile,
        applicationDate: new Date(), // Set applicationDate to current date
        status: "Pending", // Set status to Pending by default
      });

      // Send success response
      res.status(201).json({
        message: "Job application submitted successfully",
        applicant: newApplicant,
      });
    } catch (error) {
      // Log the error (optional)
      console.error(error);

      // Send error response
      res.status(500).json({
        message: "An error occurred while submitting the job application",
      });
    }
  }
}

export default ApplicantController;
