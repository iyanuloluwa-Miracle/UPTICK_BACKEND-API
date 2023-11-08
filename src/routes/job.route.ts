// Import necessary modules
import express, { Router } from "express";
import JobController from "../controllers/jobController";

// Create a new router
const router: Router = express.Router();

// Define routes
router
  .route("/")
  .get(JobController.getJobs) // GET /jobs - Get all jobs with optional pagination
  .post(JobController.createJob); // POST /jobs - Create a new job

router
  .route("/:id")
  .get(JobController.getJob) // GET /jobs/:id - Get a single job by ID
  .put(JobController.updateJob) // PUT /jobs/:id - Update a job by ID
  .delete(JobController.deleteJob); // DELETE /jobs/:id - Delete a job by ID

// Endpoint to list all applicants for a job
router.route("/:id/applicants").get(JobController.listApplicants); // GET /jobs/:id/applicants - Get all applicants for a job by job ID

// Export the router for use in other parts of your application
export default router;
