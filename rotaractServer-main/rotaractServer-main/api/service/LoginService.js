const User = require("../model/user");
const logger = require("../lib/logger");
const { response } = require("../helpers/commonResponseHandler");
const { clientError } = require("../helpers/ErrorMsg");

async function login(req, res) {
  console.log("reqqqqqqqq", req.body);
  var emailId = req.body.username.toLowerCase();
  await User.findOne({ emailId: emailId })
    .populate("role")
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        if (doc.isValid(req.body.password)) {
          logger.info("Login Success");
          response(res, true, 200, { user: doc }, clientError.loginSuccess);
        } else {
          response(res, false, 501, {}, clientError.invalidPassword);
        }
      } else {
        response(res, false, 501, {}, clientError.UserNotFound);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
}

module.exports.login = login;
