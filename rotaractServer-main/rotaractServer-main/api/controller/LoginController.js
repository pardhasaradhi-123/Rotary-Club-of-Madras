const LoginService = require("../service/LoginService");

exports.login = (req, res, next) => {
  console.log("hereeeee", req.body);
  LoginService.login(req, res);
};
