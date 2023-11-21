import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../config/database";

export interface TagAttributes {
  name: string;
}

class Tag
  extends Model<InferAttributes<Tag>, InferCreationAttributes<Tag>>
  implements TagAttributes
{
  declare name: string;
}

Tag.init(
  {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "tag",
  },
);

export default Tag;
