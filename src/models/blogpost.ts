import {
  BelongsToManyAddAssociationsMixin,
  BelongsToManyRemoveAssociationsMixin,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../config/database";
import Tag from "./tag";

export interface BlogPostAttributes {
  postId?: string;
  title: string;
  content: string;
  author: string;
  publicationDate: Date | string;
  imageUrl: string;
  tags?: Tag[];
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
  declare imageUrl: string;
  declare tags?: Tag[];

  declare addTags: BelongsToManyAddAssociationsMixin<Tag, string>;
  declare removeTags: BelongsToManyRemoveAssociationsMixin<Tag, string>;
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
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "blogPost" },
);

export default BlogPost;
