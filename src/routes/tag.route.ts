import express, { Router } from "express";
import TagController from "../controllers/tagController";

const router: Router = express.Router();

router.post("/", TagController.createTag);
router.get("/", TagController.listTags);
router.put("/:tagName", TagController.updateTag);
router.delete("/:tagName", TagController.deleteTag);

export default router;
