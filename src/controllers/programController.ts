import { Request, Response } from "express";
import { Program } from "../models";
import { ProgramAttributes } from "../models/program";
import { getPaginationOptions } from "../utils/helper";

// interface to be followed when updating a program
interface ProgramUpdateAttributes {
  ProgramID?: string;
  Name?: string;
  Description?: string;
  Type?: string;
  CurriculumOutline?: string;
  Objectives?: string;
  Benefits?: string;
  Prerequisites?: string;
  Duration?: string;
  ApplicationFormLink?: string;
  EnrollmentInformation?: string;
  StartDate?: Date | string;
  EndDate?: Date | string;
}

class ProgramController {
  static async createProgram(req: Request, res: Response): Promise<void> {
    // endpoint for admin to create programs for uptick
    try {
      // Destructure properties from req.body
      const {
        Name,
        Description,
        Type,
        CurriculumOutline,
        Objectives,
        Benefits,
        Prerequisites,
        Duration,
        ApplicationFormLink,
        EnrollmentInformation,
        StartDate,
        EndDate,
      } = req.body as ProgramAttributes;

      // Create new Program
      const newProgram = await Program.create({
        Name,
        Description,
        Type,
        CurriculumOutline,
        Objectives,
        Benefits,
        Prerequisites,
        Duration,
        ApplicationFormLink,
        EnrollmentInformation,
        StartDate: new Date(StartDate),
        EndDate: new Date(EndDate),
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
        where: { ProgramID: id },
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

  // endpoint to get all programs
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
        order: [["StartDate", "ASC"]], // Order programs by StartDate
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
        where: { ProgramID: id },
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
        where: { ProgramID: id },
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
}

export default ProgramController;
