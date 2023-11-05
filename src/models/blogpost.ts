import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../config/database";

export interface BlogPostAttributes {
  postId?: string;
  title: string;
  content: string;
  author: string;
  publicationDate: Date | string;
  tags: string[];
  imageUrl: string;
}

class BlogPost
  extends Model<InferAttributes<BlogPost>, InferCreationAttributes<BlogPost>>
  implements BlogPostAttributes
{
  declare postId: CreationOptional<string>;
  declare title: string;
  declare content: string;
  declare author: string;
  declare publicationDate: Date | string;
  declare tags: string[];
  declare imageUrl: string;
}

BlogPost.init(
  {
    postId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "blogPost" },
);

export default BlogPost;
