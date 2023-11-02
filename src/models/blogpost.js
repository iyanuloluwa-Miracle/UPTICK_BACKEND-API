const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class BlogPost extends Model {}

BlogPost.init({
  PostID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Title: DataTypes.STRING,
  Content: DataTypes.TEXT,
  Author: DataTypes.STRING,
  PublicationDate: DataTypes.DATE,
  Tags: DataTypes.ARRAY(DataTypes.STRING),
  ImageURL: DataTypes.STRING
}, { sequelize, modelName: 'BlogPost' });

module.exports = BlogPost;
