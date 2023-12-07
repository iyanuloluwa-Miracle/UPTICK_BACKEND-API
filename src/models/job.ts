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
  jobTitle: string;
  companyLogo: string;
  companyName: string;
  deadline: Date | string;
  description: string;
  jobType: string;
  jobCategory: string;
  location: string;
  startDate?: Date | string;
  endDate: Date | string;
  status?: string;
}

class Job
  extends Model<InferAttributes<Job>, InferCreationAttributes<Job>>
  implements JobAttributes
{
  declare jobId: CreationOptional<string>;
  declare description: string;
  declare companyLogo: string;
  declare companyName: string;
  declare startDate?: Date | string;
  declare endDate: Date | string;
  declare jobTitle: string;
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
    description: {
      type: DataTypes.STRING(4000),
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
      allowNull: true,
      defaultValue: "open",
    },
  },
  { sequelize, modelName: "job" },
);

export default Job;
