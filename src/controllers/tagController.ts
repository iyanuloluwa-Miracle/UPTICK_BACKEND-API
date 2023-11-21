import { Request, Response } from "express";
import { Tag } from "../models";

export default class TagController {
  static async listTags(req: Request, res: Response) {
    try {
      const tags = await Tag.findAll();

      res.json({ message: "Tags fetched successfully", data: tags });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An unknown error occurred while fetching all tags.",
      });
    }
  }

  static async createTag(req: Request, res: Response) {
    try {
      const { name } = req.body;

      const tag = await Tag.create({
        name,
      });

      res.json({ message: "Tag created successfully", data: tag });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An unknown error occurred while creating tag.",
      });
    }
  }

  static async updateTag(req: Request, res: Response) {
    try {
      const { tagName } = req.params;
      const { name } = req.body;

      const [updateCount, updatedTags] = await Tag.update(
        { name },
        { where: { name: tagName }, returning: true },
      );

      if (updateCount === 0) {
        res.status(404).json({ message: `Tag: ${tagName} not found` });
        return;
      }

      res.json({ message: "Tag updated successfully", data: updatedTags[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An unknown error occurred while updating tag.",
      });
    }
  }

  static async deleteTag(req: Request, res: Response) {
    try {
      const { tagName } = req.params;

      const deletion = await Tag.destroy({ where: { name: tagName } });

      if (deletion) {
        res.json({ message: "Tag deleted successfully" });
        return;
      }

      res.status(404).json({ message: `Tag: ${tagName} not found` });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An unknown error occurred while deleting tag.",
      });
    }
  }
}
