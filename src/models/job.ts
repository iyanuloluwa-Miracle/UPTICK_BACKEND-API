import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "./index";

export interface JobAttributes {
  JobID?: string;
  Title: string;
  Description: string;
  Requirements: string;
  ApplicationFormLink: string;
  CompanyLogo: string;
  ApplicationDeadline: Date | string;
  StartDate: Date | string;
  EndDate: Date | string;
}

class Job extends Model<
InferAttributes<Job>, InferCreationAttributes<Job>
> implements JobAttributes {
  declare JobID: CreationOptional<string>;
  declare Title: string;
  declare Description: string;
  declare Requirements: string;
  declare ApplicationFormLink: string;
  declare CompanyLogo: string;
  declare ApplicationDeadline: Date | string;
  declare StartDate: Date | string;
  declare EndDate: Date | string;
}

Job.init(
  {
    JobID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      primaryKey: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Requirements: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ApplicationFormLink: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CompanyLogo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ApplicationDeadline: {
      type: DataTypes.DATE,
      allowNull: false
    },
    StartDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    EndDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  { sequelize, modelName: "job" },
);

export default Job;
