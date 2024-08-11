const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  clubEmail: { type: String, required: true },
  clubType: { type: String, required: true },

  projectName: { type: String, required: true },
  projectChairName: { type: String, required: true },
  projectSecretaryName: { type: String, required: true },
  hostClubName: { type: String, required: true },
  coHostClubName: { type: String, required: true },
  projectAvenue: { type: String, required: true },
  noOfBenifeshiers: { type: String, required: true },
  speaker: { type: String, required: true },
  totalAmountSpent: { type: String, required: true },
  projectPhotoLink: { type: String, required: true },
  projectDescription: { type: String, required: true },
  presidentName: { type: String, required: true },
  secretaryName: { type: String, required: true },
  projectMonth: { type: String, required: true },
  totalManHourSpent: { type: String, required: true },
  venue: { type: String, required: true },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("project", projectSchema);
