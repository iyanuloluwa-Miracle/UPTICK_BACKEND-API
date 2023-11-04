import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "./index";

export interface ProgramAttributes {
  ProgramID?: string;
  Name: string;
  Description: string;
  Type: string;
  CurriculumOutline: string;
  Objectives: string;
  Benefits: string;
  Prerequisites: string;
  Duration: string;
  ApplicationFormLink: string;
  EnrollmentInformation: string;
  StartDate: Date | string;
  EndDate: Date | string;
}

class Program
  extends Model<InferAttributes<Program>, InferCreationAttributes<Program>>
  implements ProgramAttributes
{
  declare ProgramID: CreationOptional<string>;
  declare Name: string;
  declare Description: string;
  declare Type: string;
  declare CurriculumOutline: string;
  declare Objectives: string;
  declare Benefits: string;
  declare Prerequisites: string;
  declare Duration: string;
  declare ApplicationFormLink: string;
  declare EnrollmentInformation: string;
  declare StartDate: Date | string;
  declare EndDate: Date | string;
}

Program.init(
  {
    ProgramID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CurriculumOutline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Objectives: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Benefits: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Prerequisites: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ApplicationFormLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EnrollmentInformation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    StartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    EndDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, modelName: "program" },
);

export default Program;
