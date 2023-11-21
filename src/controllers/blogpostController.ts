import { Request, Response } from "express";
import { Op } from "sequelize";
import config from "../config/config";
import { BlogPost } from "../models";
import FileStorageService from "../services/file-storage";
import S3StorageService from "../services/s3-storage";
import { getPaginationOptions } from "../utils/helper";

const S3_BUCKET_NAME = config.s3.blogBucket;

export default class BlogPostController {
  static storageService =
    process.env.NODE_ENV !== "production"
      ? new FileStorageService("./uploads")
      : new S3StorageService(S3_BUCKET_NAME);

  static async listPosts(req: Request, res: Response) {
    try {
      const search = `%${req.query.search || ""}%`;
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : 10;
      const paginationOptions = getPaginationOptions(page, limit);
      const tags = (req.query.tags as string)?.split(",") || [];

      const matchingPostIds = await BlogPost.findAll({
        include: {
          association: "tags",
          attributes: ["name"],
          where:
            tags.length > 0
              ? {
                  name: {
                    [Op.in]: tags,
                  },
                }
              : undefined,
          through: {
            attributes: [],
          },
        },
        where: {
          [Op.or]: [
            {
              title: {
                [Op.iLike]: search,
              },
            },
            {
              content: {
                [Op.iLike]: search,
              },
            },
          ],
        },
      }).then((posts) => posts.map((post) => post.postId) as string[]);

      const posts = await BlogPost.findAll({
        ...paginationOptions,
        include: {
          association: "tags",
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        where: {
          postId: {
            [Op.in]: matchingPostIds,
          },
        },
        order: [["publicationDate", "DESC"]],
      });

      const paging = {
        page,
        total: matchingPostIds.length,
        totalPages: Math.ceil(matchingPostIds.length / limit),
      };

      res.json({ message: "Posts fetched successfully", data: posts, paging });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An unknown error occurred while fetching all posts.",
      });
    }
  }

  static async getPost(req: Request, res: Response) {
    try {
      const { postId } = req.params;

      const post = await BlogPost.findOne({
        where: { postId },
      });

      if (!post) {
        res.status(404).json({ message: `Post with id: ${postId} not found` });
        return;
      }

      res.json({ message: "Post fetched successfully", data: post });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An unknown error occurred while fetching post.",
      });
    }
  }

  static async createPost(req: Request, res: Response) {
    try {
      const { title, content, author } = req.body;

      if (!req.file) {
        res.status(400).json({
          message: "Image is required",
        });
        return;
      }

      const imageUrl = await BlogPostController.storageService.put(
        req.file.buffer,
        {
          filename: req.file.originalname,
        }
      );

      const post = await BlogPost.create({
        title,
        content,
        author,
        imageUrl,
        publicationDate: new Date(),
      });

      res
        .status(201)
        .json({ message: "Post created successfully", data: post });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An unknown error occurred while creating post.",
      });
    }
  }

  static async updatePost(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const { title, content, author } = req.body;

      const imageUrl = req.file
        ? await BlogPostController.storageService.put(req.file.buffer, {
            filename: req.file.originalname,
          })
        : undefined;

      const [updatedCount, updatedPosts] = await BlogPost.update(
        {
          title,
          content,
          author,
          imageUrl,
          postId,
        },
        { where: { postId }, returning: true }
      );

      if (updatedCount === 0) {
        res.status(404).json({ message: `Post with id: ${postId} not found` });
        return;
      }

      res.json({ message: "Post updated successfully", data: updatedPosts[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An unknown error occurred while updating post.",
      });
    }
  }

  static async deletePost(req: Request, res: Response) {
    try {
      const { postId } = req.params;

      const deletion = await BlogPost.destroy({ where: { postId } });

      if (deletion) {
        res.json({ message: "Post deleted successfully" });
        return;
      }

      res.status(404).json({ message: `Post with id: ${postId} not found` });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An unknown error occurred while deleting post.",
      });
    }
  }

  static async addTagsToPost(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const { tags } = req.body;

      const post = await BlogPost.findOne({ where: { postId } });

      if (!post) {
        res.status(404).json({ message: `Post with id: ${postId} not found` });
        return;
      }

      try {
        await post.addTags(tags);
      } catch (err) {
        const error = err as any;
        if (error.name === "SequelizeForeignKeyConstraintError") {
          res.status(400).json({
            message: `There was an attempt to add a non-existent tag to blog post`,
          });
          return;
        } else throw error;
      }

      res.json({ message: "Tags added to post successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An unknown error occurred while adding tags to post.",
      });
    }
  }

  static async removeTagsFromPost(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const { tags } = req.body;

      const post = await BlogPost.findOne({ where: { postId } });

      if (!post) {
        res.status(404).json({ message: `Post with id: ${postId} not found` });
        return;
      }

      await post.removeTags(tags);

      res.json({ message: "Tags removed from post successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An unknown error occurred while removing tags from post.",
      });
    }
  }
}
