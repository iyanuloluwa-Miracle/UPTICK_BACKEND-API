import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../config/database";

export interface ContactUsRequestAttributes {
  requestId?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  dateSubmitted: Date | string;
}

class ContactUsRequest
  extends Model<
    InferAttributes<ContactUsRequest>,
    InferCreationAttributes<ContactUsRequest>
  >
  implements ContactUsRequestAttributes
{
  declare requestId: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare phone: string;
  declare message: string;
  declare dateSubmitted: Date | string;
}

ContactUsRequest.init(
  {
    requestId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateSubmitted: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "contactUsRequest",
  },
);

export default ContactUsRequest;
