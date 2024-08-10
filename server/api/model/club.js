const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
  clubName: String,
  isDeleted: {
    type: Boolean,
    default: false,
  },
  clubID: Number,
  presidentName: String,
  secretaryName: String,
  email: String,
  password: String,
  clubType: String,
  month: String,
});

module.exports = mongoose.model("Club", clubSchema);
