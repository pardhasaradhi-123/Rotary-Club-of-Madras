const Project = require("../model/project");
const dateTime = require("node-datetime");
const logger = require("../lib/logger");

async function getAllProject(query) {
  return await Project.find(query).where("isDeleted").ne(true).exec();
}
async function deleteProjecct(req) {
  const dt = dateTime.create();
  const formatted = dt.format("Y-m-d H:M:S");
  return Project.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        isDeleted: true,
        modifiedBy: req.body.user,
        modifiedOn: formatted,
      },
    }
  ).exec();
}

async function updateClub(req, res) {
  var result;
  const dt = dateTime.create();
  const formatted = dt.format("Y-m-d H:M:S");

  await BillingMaster.findByIdAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        clubName: req.body.clubName,
        clubID: req.body.clubID,
        presidentName: req.body.presidentName,
        secretaryName: req.body.secretaryName,
        email: req.body.email,
        Password: req.body.Password,
        clubType: req.body.clubType,
        month: req.body.month,
      },
    }
  )
    .exec()
    .then((doc) => {
      result = doc;
    });
  return result;
}

module.exports.getAllProject = getAllProject;
module.exports.deleteProjecct = deleteProjecct;
