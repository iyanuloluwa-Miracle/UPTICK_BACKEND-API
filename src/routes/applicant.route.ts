import express, { Router } from "express";
import ApplicantController from "../controllers/applicantController";

const router: Router = express.Router();

router.route("/apply").post(ApplicantController.application);

export default router;
