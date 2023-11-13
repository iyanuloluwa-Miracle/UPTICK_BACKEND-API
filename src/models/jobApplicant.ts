import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import type Job from "./job";
import sequelize from "../config/database";

export interface JobApplicantAttributes {
  applicantId?: string;
  jobId?: ForeignKey<Job["jobId"]>;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  resumeUrl: string;
  applicationDate: Date | string;
  currentCompany?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
  portfolioUrl?: string;
  otherUrl?: string;
  additionalInfo?: string;
}

class JobApplicant
  extends Model<
    InferAttributes<JobApplicant>,
    InferCreationAttributes<JobApplicant>
  >
  implements JobApplicantAttributes
{
  declare applicantId: CreationOptional<string>;

  declare jobId: ForeignKey<Job["jobId"]>;

  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare phone?: string;
  declare address: string;
  declare resumeUrl: string;
  declare applicationDate: Date | string;
  declare currentCompany?: string;
  declare linkedinUrl?: string;
  declare githubUrl?: string;
  declare twitterUrl?: string;
  declare portfolioUrl?: string;
  declare otherUrl?: string;
  declare additionalInfo?: string;

  declare job?: Job;
}

JobApplicant.init(
  {
    applicantId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resumeUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    applicationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    currentCompany: DataTypes.STRING,
    linkedinUrl: DataTypes.STRING,
    githubUrl: DataTypes.STRING,
    twitterUrl: DataTypes.STRING,
    portfolioUrl: DataTypes.STRING,
    otherUrl: DataTypes.STRING,
    additionalInfo: DataTypes.STRING(500),
  },
  { sequelize, modelName: "jobApplicant" },
);

export default JobApplicant;
