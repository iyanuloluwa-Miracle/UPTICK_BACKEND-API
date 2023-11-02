const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Program extends Model {}

Program.init({
  ProgramID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Name: DataTypes.STRING,
  Description: DataTypes.TEXT,
  Type: DataTypes.STRING,
  CurriculumOutline: DataTypes.TEXT,
  Objectives: DataTypes.TEXT,
  Benefits: DataTypes.TEXT,
  Prerequisites: DataTypes.TEXT,
  Duration: DataTypes.STRING,
  ApplicationFormLink: DataTypes.STRING,
  EnrollmentInformation: DataTypes.TEXT,
  StartDate: DataTypes.DATE,
  EndDate: DataTypes.DATE
}, { sequelize, modelName: 'Program' });

module.exports = Program;
