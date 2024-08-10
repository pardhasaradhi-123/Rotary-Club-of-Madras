const express = require("express");
const {
  saveClub,
  getAllClub,
  deleteClub,
  updateClub,
} = require("../controller/ClubController");
const router = express.Router();

router.post("/save", saveClub);

router.get("/getAll", getAllClub);

router.delete("/deleteClub/:id", deleteClub);

router.put("/update/", updateClub);

module.exports = router;
