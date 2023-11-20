import express, { Router } from "express";
import ApplicantController from "../controllers/applicantController";

const router: Router = express.Router();

router
  .route("/:programId/apply-program")
  .post(ApplicantController.createApplication);

export default router;
