import { Request, Response } from "express";
import { ProgramApplicant, JobApplicant, Job } from "../models";
import { ProgramApplicantAttributes } from "../models/programApplicant";
import { JobApplicantAttributes } from "../models/jobApplicant";
import { getPaginationOptions } from "../utils/helper";

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
        !jobApplicant.resumeUrl
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

  static async getProgramApplicant(req: Request, res: Response): Promise<void> {
    try {
      const { programApplicantId } = req.params;
      const applicant = await ProgramApplicant.findOne({
        where: { programApplicantId },
      });

      if (!applicant) {
        res.status(404).json({ message: "Applicant not found" });
        return;
      }

      res.json(applicant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving applicant" });
    }
  }

  static async getJobApplicant(req: Request, res: Response): Promise<void> {
    try {
      const { jobApplicantId } = req.params;
      const applicant = await JobApplicant.findOne({
        where: { jobApplicantId },
      });

      if (!applicant) {
        res.status(404).json({ message: "Applicant not found" });
        return;
      }

      res.json(applicant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving applicant" });
    }
  }

  static async updateProgramApplicant(req: Request, res: Response): Promise<void> {
    try {
      const { programApplicantId } = req.params;
      const updateData = req.body as ProgramApplicantAttributes;

      const [updated] = await ProgramApplicant.update(updateData, {
        where: { programApplicantId },
      });

      if (!updated) {
        res
          .status(404)
          .json({ message: "Applicant not found or no changes made" });
        return;
      }

      const updatedApplicant = await ProgramApplicant.findOne({
        where: { programApplicantId },
      });
      res.json({
        message: "Applicant updated successfully",
        applicant: updatedApplicant,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating applicant" });
    }
  }

  static async updateJobApplicant(req: Request, res: Response): Promise<void> {
    try {
      const { jobApplicantId } = req.params;
      const updateData = req.body as JobApplicantAttributes;

      const [updated] = await JobApplicant.update(updateData, {
        where: { jobApplicantId },
      });

      if (!updated) {
        res
          .status(404)
          .json({ message: "Applicant not found or no changes made" });
        return;
      }

      const updatedApplicant = await JobApplicant.findOne({
        where: { jobApplicantId },
      });
      res.json({
        message: "Applicant updated successfully",
        applicant: updatedApplicant,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating applicant" });
    }
  }

  static async getApplicantsForJob(req: Request, res: Response) {
    try {
      const { jobId } = req.params;

      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : 10;
      const paginationOptions = getPaginationOptions(page, limit);

      const job = await Job.findByPk(jobId);

      if (!job) {
        res.status(404).json({
          message: `Job with id: ${jobId} not found`,
        });
        return;
      }

      const { count, rows } = await JobApplicant.findAndCountAll({
        ...paginationOptions,
        where: { jobId },
      });

      const paging = {
        page,
        total: count,
        totalPages: Math.ceil(count / limit),
      };

      res.status(200).json({
        message: "Applicants successfully fetched.",
        data: rows,
        paging,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "An error occurred while fetching the applicants",
      });
    }
  }
}

export default ApplicantController;
