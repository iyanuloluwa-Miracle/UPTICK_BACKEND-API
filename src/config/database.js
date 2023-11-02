const { Sequelize } = require('sequelize');
const config = require('./config');

async function connectToPostgres() {
  const sequelize = new Sequelize(config.db.postgres.options);

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);

    return null;
  }
}

module.exports = connectToPostgres;
