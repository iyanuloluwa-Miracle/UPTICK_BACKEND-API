const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./index');

class Job extends Model {}

Job.init({
  JobID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Title: DataTypes.STRING,
  Description: DataTypes.TEXT,
  Requirements: DataTypes.TEXT,
  ApplicationFormLink: DataTypes.STRING,
  CompanyLogo: DataTypes.STRING,
  ApplicationDeadline: DataTypes.DATE,
  StartDate: DataTypes.DATE,
  EndDate: DataTypes.DATE
},
{ sequelize,
  modelName: 'job'
});

module.exports = Job;
