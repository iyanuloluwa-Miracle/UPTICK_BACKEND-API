import { Request, Response } from "express";
import { Job } from "../models";
import { JobAttributes } from "../models/job";
import { getPaginationOptions } from "../utils/helper";

// interface to be followed when updating a job
interface JobUpdateAttributes {
  jobId?: string;
  applicantId?: string;
  title?: string;
  description?: string;
  requirements?: string;
  applicationFormLink?: string;
  companyLogo?: string;
  applicationDeadline?: Date | string;
  startDate?: Date | string;
  endDate?: Date | string;
}

class JobController {
  static async createJob(req: Request, res: Response): Promise<void> {
    try {
      const job = req.body as JobAttributes;

      // Create new Job
      const newJob = await Job.create({ ...job });

      res
        .status(201)
        .json({ message: "Job created successfully", job: newJob });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while creating the job" });
    }
  }

  static async getJob(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const job = await Job.findOne({
        where: { jobId: id },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      if (job) {
        res.status(200).json(job);
        return;
      }
      res.status(404).json({ message: "Job not found" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the job" });
    }
  }

  static async getJobs(req: Request, res: Response): Promise<void> {
    try {
      const { page, limit } = req.query;
      const pageNumber = page ? parseInt(page as string, 10) : undefined;
      const limitNumber = limit ? parseInt(limit as string, 10) : undefined;
      const paginationOptions = getPaginationOptions(pageNumber, limitNumber);
      const jobs = await Job.findAll({
        ...paginationOptions,
        order: [["startDate", "ASC"]],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(jobs);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the jobs" });
    }
  }

  static async deleteJob(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletion = await Job.destroy({ where: { jobId: id } });
      if (deletion) {
        res.status(200).json({ message: "Job deleted successfully" });
        return;
      }
      res.status(404).json({ message: "Job not found" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while deleting the job" });
    }
  }

  static async updateJob(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body as JobUpdateAttributes;
      const [updateCount, updatedJobs] = await Job.update(updateData, {
        where: { jobId: id },
        returning: true,
      });
      if (updateCount > 0) {
        res.status(200).json({
          message: "Job updated successfully",
          job: updatedJobs[0],
        });
        return;
      }
      res.status(404).json({ message: "Job not found" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the job" });
    }
  }
}

export default JobController;
