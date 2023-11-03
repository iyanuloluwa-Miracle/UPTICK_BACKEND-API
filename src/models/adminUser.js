const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./index');

class AdminUser extends Model {}

AdminUser.init({
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Username: DataTypes.STRING,
  Password: DataTypes.STRING,
  Role: DataTypes.STRING
},
{ sequelize,
  modelName: 'AdminUser'
});

module.exports = AdminUser;
