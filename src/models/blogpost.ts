import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "./index";

export interface BlogPostAttributes {
  PostID?: string;
  Title: string;
  Content: string;
  Author: string;
  PublicationDate: Date | string;
  Tags: string[];
  ImageURL: string;
}

class BlogPost
  extends Model<InferAttributes<BlogPost>, InferCreationAttributes<BlogPost>>
  implements BlogPostAttributes
{
  declare PostID: CreationOptional<string>;
  declare Title: string;
  declare Content: string;
  declare Author: string;
  declare PublicationDate: Date | string;
  declare Tags: string[];
  declare ImageURL: string;
}

BlogPost.init(
  {
    PostID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      primaryKey: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PublicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    ImageURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "blogPost" },
);

export default BlogPost;
