const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./index');

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
},
{ sequelize,
  modelName: 'blogPost'
});

module.exports = BlogPost;
