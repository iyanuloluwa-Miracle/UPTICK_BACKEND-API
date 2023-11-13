import express, { Router } from "express";
import JobApplicantController from "../controllers/jobApplicantController";

const router: Router = express.Router();

router.post('/:jobId/application', JobApplicantController.applyForJob)
router.get('/', JobApplicantController.getApplicantsForJob)

export default router;