import express, { Router } from "express";
import MailController from "../controllers/mailController";

const router: Router = express.Router();

router.route("/sendMail").post(MailController.sendMail);

export default router;
