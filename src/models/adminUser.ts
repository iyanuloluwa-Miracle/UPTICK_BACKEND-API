import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../config/database";

export interface AdminUserAttributes {
  userId?: string;
  username: string;
  password: string;
  role: string;
}

class AdminUser
  extends Model<InferAttributes<AdminUser>, InferCreationAttributes<AdminUser>>
  implements AdminUserAttributes
{
  declare userId: CreationOptional<string>;
  declare username: string;
  declare password: string;
  declare role: string;
}

AdminUser.init(
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "adminUser" },
);

export default AdminUser;
