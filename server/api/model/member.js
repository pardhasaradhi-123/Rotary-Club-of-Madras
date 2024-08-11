const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
  email: { type: String, required: true },
  mobileNum: { type: String, required: true },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  clubEmail: { type: String, required: true },
});

module.exports = mongoose.model("member", memberSchema);
