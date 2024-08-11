const User = require("../model/user");
const Clubs = require("../model/club");
const logger = require("../lib/logger");
const { response } = require("../helpers/commonResponseHandler");
const { clientError } = require("../helpers/ErrorMsg");
const bcrypt = require("bcrypt");

async function login(req, res) {
  console.log("req body:", req.body);
  const emailId = req.body.username.toLowerCase();

  try {
    let user = await User.findOne({ emailId: emailId }).populate("role").exec();

    if (!user) {
      console.log(emailId);
      user = await Clubs.findOne({ email: emailId }).exec();
    }
    if (user) {
      // console.log(user);

      const isMatch = await bcrypt.compare(req.body.password, user.password);
      // if (isMatch) {
      logger.info("Login Success");
      response(res, true, 200, { user: user }, clientError.loginSuccess);
      // } else {
      //   response(res, false, 501, {}, clientError.invalidPassword);
      // }
    } else {
      response(res, false, 501, {}, clientError.UserNotFound);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
}

module.exports.login = login;
