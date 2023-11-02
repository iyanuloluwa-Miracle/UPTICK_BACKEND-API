require('dotenv').config();

module.exports = {
  mail: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
    client: process.env.MAIL_CLIENT_ID,
    secret: process.env.MAIL_CLIENT_SECRET,
    refresh: process.env.MAIL_REFRESH_TOKEN,
    contact: process.env.MAIL_CONTACT
  },
  db: {
    postgres: {
      options: {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        logging: false
      },
      client: null
    }
  },
  port: process.env.PORT
};