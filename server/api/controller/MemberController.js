const Members = require("../model/member");

exports.saveMember = async (req, res, next) => {
  try {
    const newMember = new Members(req.body);
    await newMember.save();
    res
      .status(201)
      .json({ message: "Member saved successfully", member: newMember });
  } catch (error) {
    res.status(500).json({ message: "Error saving member", error });
  }
};

exports.getAllMember = async (req, res, next) => {
  try {
    const members = await Members.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: "Error fetching members", error });
  }
};
