import { Request, Response } from "express";
import { ProgramApplicantAttributes } from "../models/programApplicant";
import { Program, ProgramApplicant } from "../models";
import { getPaginationOptions } from "../utils/helper";

class ProgramApplicantController {
  // endpoint to create a new applicant
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

  // endpoint to get an applicant by id
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

  // endpoint to update applicant details
  static async updateProgramApplicant(
    req: Request,
    res: Response,
  ): Promise<void> {
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

  // endpoint to get all applicants for a program
  static async getApplicantsForProgram(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const { programId } = req.params;

      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : 10;
      const paginationOptions = getPaginationOptions(page, limit);

      const job = await Program.findByPk(programId);

      if (!job) {
        res.status(404).json({
          message: `Program with id: ${programId} not found`,
        });
        return;
      }

      const { count, rows } = await ProgramApplicant.findAndCountAll({
        ...paginationOptions,
        where: { programId },
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

export default ProgramApplicantController;
