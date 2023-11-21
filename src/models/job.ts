import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../config/database";

export interface JobAttributes {
  jobId?: string;
  title: string;
  description: string;
  requirements: string;
  applicationFormLink: string;
  companyLogo: string;
  applicationDeadline: Date | string;
  startDate: Date | string;
  endDate: Date | string;
  jobTitle: string;
  company: string;
  deadline: Date | string;
  jobDescription: string;
  jobTypes: string; // Assuming job types will be a comma-separated string
  jobCategory: string;
  location: string;
}

class Job
  extends Model<InferAttributes<Job>, InferCreationAttributes<Job>>
  implements JobAttributes
{
  declare jobId: CreationOptional<string>;
  declare title: string;
  declare description: string;
  declare requirements: string;
  declare applicationFormLink: string;
  declare companyLogo: string;
  declare applicationDeadline: Date | string;
  declare startDate: Date | string;
  declare endDate: Date | string;
  declare jobTitle: string;
  declare company: string;
  declare deadline: Date | string;
  declare jobDescription: string;
  declare jobTypes: string;
  declare jobCategory: string;
  declare location: string;

}

Job.init(
  {
    jobId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requirements: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    applicationFormLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyLogo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    applicationDeadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    jobDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobTypes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "job" },
);

export default Job;
