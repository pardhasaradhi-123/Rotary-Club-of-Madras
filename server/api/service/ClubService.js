const Clubs = require("../model/club");
const dateTime = require("node-datetime");

const saveClub = async (req, res) => {
  const dt = dateTime.create();
  const formatted = dt.format("Y-m-d H:M:S");
  const clubsDate = {
    clubName: req.body.clubName,
    clubID: req.body.clubID,
    presidentName: req.body.presidentName,
    secretaryName: req.body.secretaryName,
    email: req.body.email,
    Password: req.body.Password,
    clubType: req.body.clubType,
    month: req.body.month,
  };
  try {
    const existingClub = await Clubs.findOne({
      clubName: req.body.clubName,
      isDeleted: true,
    });
    // if (!existingClub) {
    //   return res
    //     .status(200)
    //     .json({ message: "User already exists", user: existingClub });
    // }
    const club = new Clubs(clubsDate);
    const result = await club.save();
    console.log(result, "result");
    res.status(200).json({ message: "Club added successfully!!!" });
  } catch (error) {
    console.error("Error saving Club:", error);
    res.status(500).json({ error: "Error creating Club" });
  }
};

async function getAllClub(query) {
  return await Clubs.find(query).where("isDeleted").ne(true).exec();
}
async function deleteClub(req) {
  const dt = dateTime.create();
  const formatted = dt.format("Y-m-d H:M:S");
  return Clubs.findByIdAndUpdate(
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
module.exports.saveClub = saveClub;
module.exports.getAllClub = getAllClub;
module.exports.deleteClub = deleteClub;
module.exports.updateClub = updateClub;
