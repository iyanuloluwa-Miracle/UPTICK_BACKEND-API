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
  // jobId?: ForeignKey<Job["jobId"]>;
  firstName: string;
  lastName: string;
  phone: string;
  cityState?: string;
  yearsOfExperience?: string;
  stack?: string;
  technology?: string;
  careerGoals?: string;
  githubLink?: string;
  portfolioLink?: string;
  commitment?: string;
  howDidYouHearAboutUs?: string;
  status?: string;
}

class Applicant
  extends Model<InferAttributes<Applicant>, InferCreationAttributes<Applicant>>
  implements ApplicantAttributes
{
  // omit during model creation
  declare applicantId: CreationOptional<string>;

  declare programId: ForeignKey<Program["programId"]>;
  // declare jobId: ForeignKey<Job["jobId"]>;

  declare firstName: string;
  declare lastName: string;
  declare phone: string;
  declare cityState?: string;
  declare yearsOfExperience?: string;
  declare stack?: string;
  declare technology?: string;
  declare careerGoals?: string;
  declare githubLink?: string;
  declare portfolioLink?: string;
  declare commitment?: string;
  declare howDidYouHearAboutUs?: string;
  declare status?: string;
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
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cityState: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    yearsOfExperience: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stack: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    technology: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    careerGoals: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    githubLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    portfolioLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    commitment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    howDidYouHearAboutUs: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "pending",
    },
  },
  { sequelize, modelName: "applicant" },
);

export default Applicant;
