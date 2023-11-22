import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
  public declare user_id: number;
  public declare username: string;
  public declare password: string;
}
User.init(
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
  },
);

export default User;
