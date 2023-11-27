import express, { Router } from "express";
import JobApplicantController from "../controllers/jobApplicantController";

const router: Router = express.Router();

router
  .route("/:jobId/applications")
  .post(JobApplicantController.applyForJob)
  .get(JobApplicantController.getApplicantsForJob);

export default router;
