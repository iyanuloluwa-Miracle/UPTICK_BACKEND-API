const { Sequelize, Model } = require('sequelize');
const config = require('../config/config');

// initialize db
const sequelize = new Sequelize(config.db.postgres.options);

// define relationships here
const setupAssociations = () => {}

module.exports = {
  sequelize,
};
