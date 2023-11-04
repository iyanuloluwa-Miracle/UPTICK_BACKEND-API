import dotenv from "dotenv";
import { Dialect } from "sequelize";
dotenv.config();

interface MailConfig {
  user: string;
  pass: string;
  contact: string;
}

interface PostgresOptions {
  dialect: Dialect;
  host: string;
  username: string;
  password: string;
  database: string;
  logging: boolean;
}

interface DBConfig {
  postgres: {
    options: PostgresOptions;
  };
}

const config = {
  mail: {
    user: process.env.MAIL_USER || "",
    pass: process.env.MAIL_PASSWORD || "",
    contact: process.env.MAIL_CONTACT || "",
  } as MailConfig,
  db: {
    postgres: {
      options: {
        dialect: "postgres",
        host: process.env.DB_HOST || "localhost",
        port: 5432,
        username: process.env.DB_USER || "",
        password: process.env.DB_PASS || "",
        database: process.env.DB_NAME || "",
        logging: false,
      },
    },
  } as DBConfig,
  port: Number(process.env.PORT) || (3000 as number),
};

export default config;
