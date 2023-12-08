import express, { Router } from "express";
import ProgramApplicantController from "../controllers/progApplicantController";

const router: Router = express.Router();

router
  .route("/:programId/apply-program")
  .post(ProgramApplicantController.createApplication)
  .get(ProgramApplicantController.getApplicantsForProgram);

router
  .route("/:programApplicantId/program")
  .get(ProgramApplicantController.getProgramApplicant)
  .put(ProgramApplicantController.updateProgramApplicant)
  .delete(ProgramApplicantController.deleteProgramApplicant);

export default router;
