import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../config/database";

export interface TagAttributes {
  tagId?: string;
  name: string;
}

class Tag
  extends Model<InferAttributes<Tag>, InferCreationAttributes<Tag>>
  implements TagAttributes
{
  declare tagId: CreationOptional<string>;
  declare name: string;
}

Tag.init(
  {
    tagId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "tag",
  },
);

export default Tag;
