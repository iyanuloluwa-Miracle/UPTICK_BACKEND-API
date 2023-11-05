import express, { Router } from "express";
import ApplicantController from "../controllers/applicantController";

const router: Router = express.Router();

router
  .route("/apply-program/:programId")
  .post(ApplicantController.createApplication);

router
  .route("/apply-job/:jobId")
  .post(ApplicantController.applyForJob);

export default router;
