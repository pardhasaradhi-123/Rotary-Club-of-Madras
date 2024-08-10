const dotenv = require("dotenv");

require("dotenv").config({
  path:
    ".env." +
    (process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "development"),
});

exports.SERVER = {
  APP_NAME: "rotoryserver",
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  MONGODB_USER: process.env.MONGODB_USER,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
};
