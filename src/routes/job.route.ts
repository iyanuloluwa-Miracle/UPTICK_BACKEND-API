// Import necessary modules
import express, { NextFunction, Request, Response, Router } from "express";
import multer from "multer";
import JobApplicantController from "../controllers/jobApplicantController";
import JobController from "../controllers/jobController";

// Create a new router
const router: Router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
});

// Define routes
router
  .route("/")
  .get(JobController.getJobs) // GET /jobs - Get all jobs with optional pagination
  .post(upload.single("companyLogo"), JobController.createJob); // POST /jobs - Create a new job

router
  .route("/:id")
  .get(JobController.getJob) // GET /jobs/:id - Get a single job by ID
  .put(JobController.updateJob) // PUT /jobs/:id - Update a job by ID
  .delete(JobController.deleteJob); // DELETE /jobs/:id - Delete a job by ID

router.post(
  "/:jobId/applications",
  upload.single("resume"),
  JobApplicantController.applyForJob
);
router.get("/:jobId/applications", JobApplicantController.getApplicantsForJob);

router.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      message: `${error.message}${
        error.code === "LIMIT_FILE_SIZE" ? ". Maximum file size is 5MB." : ""
      }`,
    });
  }

  next(error);
});

// Export the router for use in other parts of your application
export default router;
