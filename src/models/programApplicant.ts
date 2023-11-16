import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";
import sequelize from "../config/database";
import { Program } from ".";

export interface ProgramApplicantAttributes {
  programApplicantId?: string;
  programId?: ForeignKey<Program["programId"]>;
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
  frontendTechStack?: string;
  backendTechStack?: string;
  mobileTechStack?: string;
  otherFieldStack?: string;
}

class ProgramApplicant
  extends Model<
    InferAttributes<ProgramApplicant>,
    InferCreationAttributes<ProgramApplicant>
  >
  implements ProgramApplicantAttributes
{
  // omit during model creation
  declare programApplicantId: CreationOptional<string>;
  declare programId: ForeignKey<Program["programId"]>;

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
  declare frontendTechStack?: string;
  declare backendTechStack?: string;
  declare mobileTechStack?: string;
  declare otherFieldStack?: string;
}

ProgramApplicant.init(
  {
    programApplicantId: {
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
    frontendTechStack: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    backendTechStack: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobileTechStack: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otherFieldStack: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: "programApplicant" },
);

export default ProgramApplicant;
