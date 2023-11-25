// ./src/models/techTalentApplicant.ts
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

export interface TechTalentApplicantAttributes {
  talentApplicantId?: string;
  programId?: ForeignKey<Program["programId"]>;

  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nameOfCompany: string;
  companyLogoPath?: string; // Optional, depending on whether a file was uploaded
  country: string;
  city: string;
  talentRole: string;
  expertiseLevel: string;
  salaryRange: string;
  howDidYouHearAboutUs: string;
  status: string;
}

export class TechTalentApplicant extends Model<TechTalentApplicantAttributes> implements TechTalentApplicantAttributes {
  declare talentApplicantId: CreationOptional<string>;
  declare programId: ForeignKey<Program["programId"]>;

  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare phoneNumber: string;
  declare nameOfCompany: string;
  declare companyLogoPath: string;
  declare country: string;
  declare city: string;
  declare talentRole: string;
  declare expertiseLevel: string;
  declare salaryRange: string;
  declare howDidYouHearAboutUs: string;
  declare status: string;
}

TechTalentApplicant.init({
talentApplicantId: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING(128),
    allowNull: false,
    validate: {
      notEmpty: true, // don't allow empty strings
    },
  },
  lastName: {
    type: DataTypes.STRING(128),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true, // no duplicate emails
    validate: {
      isEmail: true,
    },
  },
  phoneNumber: {
    type: DataTypes.STRING(128),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  nameOfCompany: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  companyLogoPath: {
    type: DataTypes.STRING(255), // assuming you're saving the path as a string
    allowNull: true, // this is an optional field
  },
  country: {
    type: DataTypes.STRING(128),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  city: {
    type: DataTypes.STRING(128),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  talentRole: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expertiseLevel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salaryRange: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  howDidYouHearAboutUs: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "pending",
  },
  },{
  // Other model options go here
  sequelize, // pass in the sequelize instance
  modelName: 'techTalentApplicant',
});

export default TechTalentApplicant;
