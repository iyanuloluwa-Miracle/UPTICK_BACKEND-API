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


export interface StartupApplicantAttributes {
  startupApplicantId?: string;
  programId?: ForeignKey<Program["programId"]>;

  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nameOfStartup: string;
  linkToWork: string;
  shortDescription: string;
  country: string;
  city: string;
  needs: string;
  howDidYouHearAboutUs: string;
  status: string;
}

export class StartupApplicant extends Model<InferAttributes<StartupApplicant>, InferCreationAttributes<StartupApplicant>> implements StartupApplicantAttributes {
  declare startupApplicantId: CreationOptional<string>;
  declare programId: ForeignKey<Program["programId"]>;

  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare phoneNumber: string;
  declare nameOfStartup: string;
  declare linkToWork: string;
  declare shortDescription: string;
  declare country: string;
  declare city: string;
  declare needs: string;
  declare howDidYouHearAboutUs: string;
  declare status: string;
}

StartupApplicant.init({
  startupApplicantId: {
    type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
  },
  firstName: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  lastName: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phoneNumber: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  nameOfStartup: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  linkToWork: {
    type: new DataTypes.STRING(128),
    allowNull: true, // This field can be optional
  },
  shortDescription: {
    type: new DataTypes.TEXT,
    allowNull: true, // This field can be optional
  },
  country: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  city: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  needs: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
  howDidYouHearAboutUs: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "pending",
  },
}, {
  sequelize,
  tableName: 'startupApplicant',
});

export default StartupApplicant;