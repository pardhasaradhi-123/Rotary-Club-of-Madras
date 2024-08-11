const express = require("express");

const { saveMember, getAllMember } = require("../controller/MemberController");

const router = express.Router();

router.post("/save", saveMember);

router.get("/getAll", getAllMember);

module.exports = router;
