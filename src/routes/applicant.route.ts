import express, { Router } from "express";
import ApplicantController from "../controllers/applicantController";

const router: Router = express.Router();

router
  .route("/:programId/apply-program")
  .post(ApplicantController.createApplication);

router
  .route("/:jobId/apply-job")
  .post(ApplicantController.applyForJob);

export default router;
