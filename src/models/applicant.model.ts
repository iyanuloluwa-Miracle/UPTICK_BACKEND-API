import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface SoftwareEngineerApplicationAttributes {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  city: string;
  yearsOfProgrammingExperience: '1-2 years' | 'Above 2 years';
  stackProficiency: 'Mobile' | 'Frontend' | 'Backend' | 'FullStack' | 'Others';
  frontendTechnology: 'Reactjs' | 'Vuejs' | 'Angularjs' | 'Nextjs' | 'Others';
  mobileTechnology: 'Flutter' | 'React Native' | 'Others';
  backendTechnology: 'Django' | 'Nodejs' | 'PHP' | 'Others';
  gitHubLink: string | null;
  portfolioUrl: string | null;
  careerGoal: string;
  otherTracks: string;
  commitmentForm: 'Yes' | 'No';
  getToKnowUs: 'GDSC OAU' | 'GDSC FUTA' | 'Code Plateau' | 'Akure Tech Hub' | 'GDSC Unilag' | 'GDSC Abuja';
  email: string;
  education: string;
  employmentStatus: 'Employed' | 'Unemployed';
}

interface SoftwareEngineerApplicationCreationAttributes
  extends Optional<SoftwareEngineerApplicationAttributes, 'gitHubLink' | 'portfolioUrl'> {}

class SoftwareEngineerApplicationModel
  extends Model<
    SoftwareEngineerApplicationAttributes,
    SoftwareEngineerApplicationCreationAttributes
  >
  implements SoftwareEngineerApplicationAttributes {
  declare firstName: string;
  declare lastName: string;
  declare phoneNumber: string;
  declare city: string;
  declare yearsOfProgrammingExperience: '1-2 years' | 'Above 2 years';
  declare stackProficiency: 'Mobile' | 'Frontend' | 'Backend' | 'FullStack' | 'Others';
  declare frontendTechnology: 'Reactjs' | 'Vuejs' | 'Angularjs' | 'Nextjs' | 'Others';
  declare backendTechnology: 'Django' | 'Nodejs' | 'PHP' | 'Others';
  declare mobileTechnology: 'Flutter' | 'React Native' | 'Others';
  declare gitHubLink: string | null;
  declare portfolioUrl: string | null;
  declare careerGoal: string;
  declare otherTracks: string;
  declare commitmentForm: 'Yes' | 'No';
  declare getToKnowUs: 'GDSC OAU' | 'GDSC FUTA' | 'Code Plateau' | 'Akure Tech Hub' | 'GDSC Unilag' | 'GDSC Abuja';
  declare email: string;
  declare education: string;
  declare employmentStatus: 'Employed' | 'Unemployed';
}

SoftwareEngineerApplicationModel.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearsOfProgrammingExperience: {
      type: DataTypes.ENUM('1-2 years', 'Above 2 years'),
      allowNull: false,
    },
    stackProficiency: {
      type: DataTypes.ENUM('Mobile', 'Frontend', 'Backend', 'FullStack', 'Others'),
      allowNull: false,
    },
    frontendTechnology: {
      type: DataTypes.ENUM('Reactjs', 'Vuejs', 'Angularjs', 'Nextjs', 'Others'),
      allowNull: false,
    },
    backendTechnology: {
      type: DataTypes.ENUM('Django', 'Nodejs', 'PHP', 'Others'),
      allowNull: false,
    },
    mobileTechnology: {
      type: DataTypes.ENUM('Flutter', 'React Native', 'Others'),
      allowNull: false,
    },
    gitHubLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    portfolioUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    careerGoal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otherTracks: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commitmentForm: {
      type: DataTypes.ENUM('Yes', 'No'),
      allowNull: false,
    },
    getToKnowUs: {
      type: DataTypes.ENUM(
        'GDSC OAU',
        'GDSC FUTA',
        'Code Plateau',
        'Akure Tech Hub',
        'GDSC Unilag',
        'GDSC Abuja'
      ),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    education: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employmentStatus: {
      type: DataTypes.ENUM('Employed', 'Unemployed'),
      allowNull: false,
    },
  },
  { sequelize, modelName: 'software_engineer_applications' }
);

export default SoftwareEngineerApplicationModel;
