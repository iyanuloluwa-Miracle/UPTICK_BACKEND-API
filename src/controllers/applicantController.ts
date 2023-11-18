import { Request, Response } from "express";
import { Error, ValidationError } from "sequelize";
import { Applicant, Job } from "../models";
import { ApplicantAttributes } from "../models/applicant";
import JobApplicant, { JobApplicantAttributes } from "../models/jobApplicant";
import { getPaginationOptions } from "../utils/helper";

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

  static async applyForJob(req: Request, res: Response): Promise<void> {
    try {
      const { jobId } = req.params;

      const {
        firstName,
        lastName,
        email,
        phone,
        address,
        resumeUrl,
        additionalInfo,
        currentCompany,
        githubUrl,
        linkedinUrl,
        otherUrl,
        portfolioUrl,
        twitterUrl,
      } = req.body as Omit<JobApplicantAttributes, "applicationDate">;

      try {
        const newApplicant = await JobApplicant.create({
          jobId,
          firstName,
          lastName,
          email,
          phone,
          address,
          resumeUrl,
          applicationDate: new Date(),
          additionalInfo,
          currentCompany,
          githubUrl,
          linkedinUrl,
          otherUrl,
          portfolioUrl,
          twitterUrl,
        });

        res.status(201).json({
          message: "Job application submitted successfully",
          applicant: newApplicant,
        });
      } catch (err) {
        if (
          err instanceof Error &&
          err.name === "SequelizeForeignKeyConstraintError"
        ) {
          res.status(404).json({
            message: `Job with id: ${jobId} not found`,
          });
          return;
        }

        if (err instanceof ValidationError) {
          const invalidPaths = err.errors.map((error) => error.path);
          res.status(400).json({
            message: `The following fields are required: ${invalidPaths.join(
              ", "
            )}`,
          });
          return;
        } else throw err;
      }
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "An error occurred while submitting the job application",
      });
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
