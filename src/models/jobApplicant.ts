import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";
import sequelize from "../config/database";
import { Job } from ".";

export interface JobApplicantAttributes {
  jobApplicantId?: string;
  jobId?: ForeignKey<Job["jobId"]>;
  resume: string;
  fullName: string;
  email: string;
  phone: string;
  currentCompany?: string;
  linkedInUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  twitterUrl?: string;
  otherWebsite?: string;
  cityCountry?: string;
  additionalInfo?: string;
  status?: string;
}

class JobApplicant
  extends Model<
    InferAttributes<JobApplicant>,
    InferCreationAttributes<JobApplicant>
  >
  implements JobApplicantAttributes
{
  declare jobApplicantId: CreationOptional<string>;
  declare jobId: ForeignKey<Job["jobId"]>;

  declare resume: string;
  declare fullName: string;
  declare email: string;
  declare phone: string;
  declare currentCompany?: string;
  declare linkedInUrl?: string;
  declare githubUrl?: string;
  declare portfolioUrl?: string;
  declare twitterUrl?: string;
  declare otherWebsite?: string;
  declare cityCountry?: string;
  declare additionalInfo?: string;
  declare status?: string;
}

JobApplicant.init(
  {
    jobApplicantId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      primaryKey: true,
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
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
    currentCompany: {
      type: DataTypes.STRING,
    },
    linkedInUrl: {
      type: DataTypes.STRING,
    },
    githubUrl: {
      type: DataTypes.STRING,
    },
    portfolioUrl: {
      type: DataTypes.STRING,
    },
    twitterUrl: {
      type: DataTypes.STRING,
    },
    otherWebsite: {
      type: DataTypes.STRING,
    },
    cityCountry: {
      type: DataTypes.STRING,
    },
    additionalInfo: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "jobApplicant",
  },
);

export default JobApplicant;
