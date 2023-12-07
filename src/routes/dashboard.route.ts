import express, { Router } from "express";
import DashboardController from "../controllers/dashboardController";

// Create a new router
const router: Router = express.Router();

router.route('/')
  .get(DashboardController.dashContent);

export default router;