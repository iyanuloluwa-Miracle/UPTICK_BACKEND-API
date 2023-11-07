import { Request, Response } from "express";
import { Program, Applicant } from "../models";
import { ProgramAttributes } from "../models/program";
import { getPaginationOptions } from "../utils/helper";

// interface to be followed when updating a program
interface ProgramUpdateAttributes {
  programId?: string;
  name?: string;
  description?: string;
  type?: string;
  curriculumOutline?: string;
  objectives?: string;
  benefits?: string;
  prerequisites?: string;
  duration?: string;
  applicationFormLink?: string;
  enrollmentInformation?: string;
  startDate?: Date | string;
  endDate?: Date | string;
}

class ProgramController {
  // endpoint for admin to create programs
  static async createProgram(req: Request, res: Response): Promise<void> {
    try {
      // Destructure properties from req.body
      const {
        name,
        description,
        type,
        curriculumOutline,
        objectives,
        benefits,
        prerequisites,
        duration,
        applicationFormLink,
        enrollmentInformation,
        startDate,
        endDate,
      } = req.body as ProgramAttributes;

      // Create new Program
      const newProgram = await Program.create({
        name,
        description,
        type,
        curriculumOutline,
        objectives,
        benefits,
        prerequisites,
        duration,
        applicationFormLink,
        enrollmentInformation,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });

      // Send success response
      res.status(201).json({
        message: "Program created successfully",
        program: newProgram,
      });
    } catch (error) {
      // Log the error (optional)
      console.error(error);

      // Send error response
      res.status(500).json({
        message: "An error occurred while creating the program",
      });
    }
  }

  // endpoint to get a program based on the programID
  static async getProgram(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params; // Assume the program ID is passed as a URL parameter

      // Find the program
      const program = await Program.findOne({
        where: { programId: id },
        attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude createdAt and updatedAt from the response
      });

      if (program) {
        // Send success response if the program was found
        res.status(200).json(program);
        return;
      }
      // Send not found response if no program was found
      res.status(404).json({
        message: "Program not found",
      });
    } catch (error) {
      // Log the error (optional)
      console.error(error);

      // Send error response
      res.status(500).json({
        message: "An error occurred while fetching the program",
      });
    }
  }

  // endpoint to get the list of all programs
  static async getPrograms(req: Request, res: Response): Promise<void> {
    try {
      // Get the page and limit query parameters
      const { page, limit } = req.query;

      // Convert page and limit to numbers, if they are provided
      const pageNumber = page ? parseInt(page as string, 10) : undefined;
      const limitNumber = limit ? parseInt(limit as string, 10) : undefined;

      // Get the pagination options
      const paginationOptions = getPaginationOptions(pageNumber, limitNumber);

      // Fetch all Programs
      const programs = await Program.findAll({
        ...paginationOptions,
        order: [["startDate", "ASC"]], // Order programs by startDate
        attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude createdAt and updatedAt from the response
      });

      // Send success response
      res.status(200).json(programs);
    } catch (error) {
      // Log the error
      console.error(error);

      // Send error response
      res.status(500).json({
        message: "An error occurred while fetching the programs",
      });
    }
  }

  // endpoint to delete a program based on the id
  static async deleteProgram(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params; // program ID is passed as a URL parameter

      // Find and delete the program
      const deletion = await Program.destroy({
        where: { programId: id },
      });

      if (deletion) {
        // Send success response if deletion was successful
        res.status(200).json({
          message: "Program deleted successfully",
        });
        return;
      }

      // Send not found response if no program was found to delete
      res.status(404).json({
        message: "Program not found",
      });
    } catch (error) {
      // Log the error (optional)
      console.error(error);

      // Send error response
      res.status(500).json({
        message: "An error occurred while deleting the program",
      });
    }
  }

  // endpoint to update a program based on an ID
  static async updateProgram(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params; // program ID is passed as a URL parameter
      const updateData = req.body as ProgramUpdateAttributes; // the new program data is sent in the request body

      // Update the program
      const [updateCount, updatedPrograms] = await Program.update(updateData, {
        where: { programId: id },
        returning: true, // Return the updated program data
      });

      if (updateCount > 0) {
        // Send success response if the update was successful
        res.status(200).json({
          message: "Program updated successfully",
          program: updatedPrograms[0],
        });
        return;
      }

      // Send not found response if no program was found to update
      res.status(404).json({
        message: "Program not found",
      });
      return;
    } catch (error) {
      // Log the error (optional)
      console.error(error);

      // Send error response
      res.status(500).json({
        message: "An error occurred while updating the program",
      });
    }
  }

  // endpoint to get the list of all applicants for a program
  static async listApplicants(req: Request, res: Response): Promise<void> {
    try {
      const programId = req.params.id; // assuming your route parameter is named 'id'

      // Validate programId
      if (!programId) {
        res.status(400).send({ error: "Program ID is required" });
        return;
      }

      // Fetching applicants based on program ID
      const applicants = await Applicant.findAll({
        where: { programId },
        attributes: {
          exclude: ["programId", "jobId", "createdAt", "updatedAt"],
        },
      });

      // Sending response
      res.status(200).json(applicants);
    } catch (error) {
      console.error(error); // Log error (implement using a logging library later)
      res
        .status(500)
        .send({ error: "An error occurred while fetching applicants" });
    }
  }
}

export default ProgramController;
