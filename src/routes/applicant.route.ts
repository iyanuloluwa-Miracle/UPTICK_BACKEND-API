import express, { Router } from "express";
import ApplicantController from "../controllers/applicantController";

const router: Router = express.Router();

// a
router
  .route("/:programId/apply-program")
  .post(ApplicantController.createApplication);

router.route("/:jobId/apply-job").post(ApplicantController.applyForJob);

// get an applicant by id
router
  .route("/:programApplicantId")
  .get(ApplicantController.getProgramApplicant);
router.route("/:jobApplicantId").get(ApplicantController.getJobApplicant);

// update an applicant by id
router
  .route("/:programApplicantId")
  .put(ApplicantController.updateProgramApplicant);
router.route("/:jobApplicantId").put(ApplicantController.updateJobApplicant);

export default router;
