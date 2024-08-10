const clubService = require("../service/ClubService");
const logger = require("../lib/logger");
const { clientError } = require("../helpers/ErrorMsg");
const { validationResult } = require("express-validator");
const { response } = require("../helpers/commonResponseHandler");

exports.saveClub = (req, res, next) => {
  console.log(req.body);
  clubService.saveClub(req, res);
};

exports.getAllClub = (req, res, next) => {
  var query = {};
  clubService.getAllClub(query).then((doc) => {
    res.status(200).json(doc);
  });
};

exports.deleteClub = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    clubService
      .deleteClub(req)
      .then((doc) => {
        logger.info(
          "delete Club Success Date:",
          new Date(),
          " user:" + req.body.user
        );
        response(res, true, 200, doc, clientError.deletedSuccessfully);
      })
      .catch(next);
  } else {
    response(
      res,
      false,
      422,
      {},
      clientError.fieldValidation,
      JSON.stringify(errors.mapped())
    );
  }
};
exports.updateClub = (req, res, next) => {
  clubService
    .updateClub(req, res)
    .then((doc) => {
      logger.info("updateClub Success");
      res.status(200).json(doc);
    })
    .catch(next);
};
