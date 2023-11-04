import { Sequelize, Model } from "sequelize";
import config from "../config/config";

// initialize db
const sequelize = new Sequelize(config.db.postgres.options);

// define relationships here
const setupAssociations = () => {};

export { sequelize };
