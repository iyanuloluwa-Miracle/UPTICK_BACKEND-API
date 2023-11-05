import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../config/database";

export interface AdminUserAttributes {
  UserID?: string;
  Username: string;
  Password: string;
  Role: string;
}

class AdminUser
  extends Model<InferAttributes<AdminUser>, InferCreationAttributes<AdminUser>>
  implements AdminUserAttributes
{
  declare UserID: CreationOptional<string>;
  declare Username: string;
  declare Password: string;
  declare Role: string;
}

AdminUser.init(
  {
    UserID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      primaryKey: true,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "AdminUser" },
);

export default AdminUser;
