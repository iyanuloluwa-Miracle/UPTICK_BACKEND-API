import { Request, Response } from "express";
import { ProgramApplicant, JobApplicant } from "../models";
import { ProgramApplicantAttributes } from "../models/programApplicant";
import { JobApplicantAttributes } from "../models/jobApplicant";

class ApplicantController {
  static async createApplication(req: Request, res: Response): Promise<void> {
    try {
      // Get programId from URL parameters
      const { programId } = req.params;

      // Destructure applicant details from req.body
      const applicant = req.body as Omit<
        ProgramApplicantAttributes,
        "programApplicantId" | "programId" | "status"
      >;

      // Validate programId and other necessary fields
      if (!programId || !applicant.firstName || !applicant.lastName) {
        res.status(400).json({ message: "Required fields are missing" });
        return;
      }

      // Create new applicant
      const newApplicant = await ProgramApplicant.create({
        ...applicant,
        programId,
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
      const jobApplicant = req.body as Omit<
        JobApplicantAttributes,
        "jobApplicantId" | "jobId" | "status"
      >;

      // Validate jobId and other necessary fields
      if (
        !jobId ||
        !jobApplicant.fullName ||
        !jobApplicant.email ||
        !jobApplicant.phone ||
        !jobApplicant.resume
      ) {
        res.status(400).json({ message: "Required fields are missing" });
        return;
      }

      // Create new applicant
      const newApplicant = await JobApplicant.create({
        ...jobApplicant,
        jobId,
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
