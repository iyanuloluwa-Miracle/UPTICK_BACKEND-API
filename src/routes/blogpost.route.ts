import express, { Router } from "express";
import BlogPostController from "../controllers/blogpostController";

const router: Router = express.Router();

router.post("/", BlogPostController.createPost);
router.get("/", BlogPostController.listPosts);
router.get("/:postId", BlogPostController.getPost);
router.put("/:postId", BlogPostController.updatePost);
router.delete("/:postId", BlogPostController.deletePost);
router.put("/:postId/tag", BlogPostController.addTagsToPost);
router.put("/:postId/untag", BlogPostController.removeTagsFromPost);

export default router;
