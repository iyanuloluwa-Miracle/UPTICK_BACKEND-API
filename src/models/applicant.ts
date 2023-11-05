import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";
import sequelize from "../config/database";
import { Program, Job } from ".";

export interface ApplicantAttributes {
  applicantId?: string;
  programId?: ForeignKey<Program["programId"]>;
  jobId?: ForeignKey<Job["jobId"]>;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  resumeFile: string;
  applicationDate: Date | string;
  status: string;
}

class Applicant
  extends Model<InferAttributes<Applicant>, InferCreationAttributes<Applicant>>
  implements ApplicantAttributes
{
  // omit during model creation
  declare applicantId: CreationOptional<string>;

  declare programId: ForeignKey<Program["programId"]>;
  declare jobId: ForeignKey<Job["jobId"]>;

  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare phone: string;
  declare address: string;
  declare resumeFile: string;
  declare applicationDate: Date | string;
  declare status: string;
}

Applicant.init(
  {
    applicantId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resumeFile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // programPreferenceID: DataTypes.INTEGER,
    // jobAppliedForID: DataTypes.INTEGER,
    applicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "applicant" },
);

export default Applicant;
