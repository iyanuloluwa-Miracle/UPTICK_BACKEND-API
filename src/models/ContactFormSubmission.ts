import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../config/database";

export interface ContactFormSubmissionAttributes {
  name: string;
  email: string;
  phone: string;
  message: string;
}

class ContactFormSubmission
  extends Model<
    InferAttributes<ContactFormSubmission>,
    InferCreationAttributes<ContactFormSubmission>
  >
  implements ContactFormSubmissionAttributes
{
  declare name: string;
  declare email: string;
  declare phone: string;
  declare message: string;
}

ContactFormSubmission.init(
  {
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
  },
  { sequelize, modelName: "contactFormSubmission" }
);

export default ContactFormSubmission;
