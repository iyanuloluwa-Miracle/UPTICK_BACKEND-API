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
  companyLogo: string;
  companyName: string;
  applicationDeadline: Date | string;
  startDate?: Date | string;
  endDate: Date | string;
  jobTitle: string;
  company: string;
  deadline: Date | string;
  jobType: string;
  jobCategory: string;
  location: string;
  status?: string;
}

class Job
  extends Model<InferAttributes<Job>, InferCreationAttributes<Job>>
  implements JobAttributes
{
  declare jobId: CreationOptional<string>;
  declare title: string;
  declare description: string;
  declare requirements: string;
  declare companyLogo: string;
  declare companyName: string;
  declare applicationDeadline: Date | string;
  declare startDate?: Date | string;
  declare endDate: Date | string;
  declare jobTitle: string;
  declare company: string;
  declare deadline: Date | string;
  declare jobType: string;
  declare jobCategory: string;
  declare location: string;
  declare status?: string;
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
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    requirements: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyLogo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    applicationDeadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
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
    jobType: {
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
    status: {
      type: DataTypes.STRING,
      defaultValue: "open",
    },
  },
  { sequelize, modelName: "job" },
);

export default Job;
