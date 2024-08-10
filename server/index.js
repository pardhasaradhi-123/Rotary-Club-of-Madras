const express = require("express");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const CronJob = require("cron").CronJob;

const login = require("./api/router/LoginRouter");
const club = require("./api/router/ClubRouter");
const project = require("./api/router/ProjectRouter");
const member = require('./api/router/MemberRouter')

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: "5mb" }));
app.use(morgan("dev"));
app.use(bodyparser.json());

app.use("/api/v1/logins", login);
app.use("/api/v1/club", club);
app.use("/api/v1/projects", project);
app.use("/api/v1/member", member)

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Orgin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Orgin,X-Request-With, Content-Type, Accept"
  );
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  next();
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = app;
