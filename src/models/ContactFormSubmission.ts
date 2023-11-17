// models/ContactFormSubmission.ts

import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../config/database";

export interface ContactFormSubmissionAttributes {
  id?: string; // Make 'id' optional
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
  declare id: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare phone: string;
  declare message: string;
}

ContactFormSubmission.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
  },
  { sequelize, modelName: "contactFormSubmission" }
);

export default ContactFormSubmission;
