const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./index');

class Applicant extends Model {}

// console.log(config.db.postgres.client);
Applicant.init({
  applicantID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
  resumeFile: DataTypes.STRING,
  programPreferenceID: DataTypes.INTEGER,
  jobAppliedForID: DataTypes.INTEGER,
  applicationDate: DataTypes.DATE,
  status: DataTypes.STRING
},
{ sequelize,
  modelName: 'applicant'
});

module.exports = Applicant;
