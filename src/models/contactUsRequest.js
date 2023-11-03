const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./index');

class ContactUsRequest extends Model {}

ContactUsRequest.init({
  RequestID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Name: DataTypes.STRING,
  Email: DataTypes.STRING,
  Phone: DataTypes.STRING,
  Message: DataTypes.TEXT,
  DateSubmitted: DataTypes.DATE
},
{
  sequelize,
  modelName: 'contactUsRequest'
});

module.exports = ContactUsRequest;
