// models/database.ts
import { Sequelize } from "sequelize";
import config from "./config";

// initialize db
const sequelize = new Sequelize(config.db.postgres.options);

export default sequelize;
