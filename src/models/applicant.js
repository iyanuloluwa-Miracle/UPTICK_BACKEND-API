const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Applicant extends Model {}

Applicant.init({
  ApplicantID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  FirstName: DataTypes.STRING,
  LastName: DataTypes.STRING,
  Email: DataTypes.STRING,
  Phone: DataTypes.STRING,
  Address: DataTypes.STRING,
  ResumeFile: DataTypes.STRING,
  ProgramPreferenceID: DataTypes.INTEGER,
  JobAppliedForID: DataTypes.INTEGER,
  ApplicationDate: DataTypes.DATE,
  Status: DataTypes.STRING
}, { sequelize, modelName: 'Applicant' });

module.exports = Applicant;
