import express from "express";
import ContactUsController from "../controllers/contactController";

const router = express.Router();

router.post("/", ContactUsController.submitForm);

export default router;
