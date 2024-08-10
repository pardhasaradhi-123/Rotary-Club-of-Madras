const express = require("express");
const {
  saveProject,
  getAllProject,
  deleteProjecct,
} = require("../controller/ProjectController");
const router = express.Router();

router.post("/save", saveProject);

router.get("/getAll", getAllProject);

router.delete("/deleteClub/:id", deleteProjecct);

router.put("/update");

module.exports = router;
