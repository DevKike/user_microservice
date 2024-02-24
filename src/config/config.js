const { config } = require("dotenv");
config();

module.exports = {
  SERVER: {
    PORT: process.env.PORT || 3001,
  },
  DATABASE: {
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
  },
  TOKEN: {
    jwtToken: process.env.SECRET_ACCESS_TOKEN,
  },
  ROLES: {
    ADMIN: "admin",
    USER: "user"
  },
  URL: {
    NOTIFICATION: process.env.URL_NOTIFICATION
  }
};