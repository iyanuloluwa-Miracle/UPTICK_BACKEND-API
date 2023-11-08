// Import necessary modules
import express, { Router } from "express";
import ProgramController from "../controllers/programController";

// Create a new router
const router: Router = express.Router();

// Define routes
router
  .route("/")
  .get(ProgramController.getPrograms) // GET /programs - Get all programs with optional pagination
  .post(ProgramController.createProgram); // POST /programs - Create a new program

router
  .route("/:id")
  .get(ProgramController.getProgram) // GET /programs/:id - Get a single program by ID
  .put(ProgramController.updateProgram) // PUT /programs/:id - Update a program by ID
  .delete(ProgramController.deleteProgram); // DELETE /programs/:id - Delete a program by ID

// Endpoint to list all applicants for a program
router.route("/:id/applicants").get(ProgramController.listApplicants); // GET /programs/:id/applicants - Get all applicants for a program by program ID

// Export the router for use in other parts of your application
export default router;
