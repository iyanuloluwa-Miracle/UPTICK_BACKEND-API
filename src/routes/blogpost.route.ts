import express, { NextFunction, Request, Response, Router } from "express";
import multer, { MulterError } from "multer";
import BlogPostController from "../controllers/blogpostController";

const router: Router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // no larger than 10mb
  },
});

router.post("/", upload.single("image"), BlogPostController.createPost);
router.get("/", BlogPostController.listPosts);
router.get("/:postId", BlogPostController.getPost);
router.put(
  "/:postId",
  upload.single("image"),
  (error: any, req: Request, res: Response, next: NextFunction) => {
    if (
      error instanceof MulterError &&
      (error.code as any) === "MISSING_FIELD_NAME"
    )
      next();
    else next(error);
  },
  BlogPostController.updatePost
);
router.delete("/:postId", BlogPostController.deletePost);
router.put("/:postId/tag", BlogPostController.addTagsToPost);
router.put("/:postId/untag", BlogPostController.removeTagsFromPost);

router.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof multer.MulterError) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }

  next(error);
});

export default router;
