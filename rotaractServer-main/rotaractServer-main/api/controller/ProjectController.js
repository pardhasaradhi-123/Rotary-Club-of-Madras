const projectSevice = require("../service/ProjectService");
const Project = require("../model/project");
const logger = require("../lib/logger");
const { clientError } = require("../helpers/ErrorMsg");
const { validationResult } = require("express-validator");
const { response } = require("../helpers/commonResponseHandler");

exports.saveProject = async (req, res, next) => {
  console.log(req.body);
  const {
    projectName,
    projectChairName,
    projectSecretaryName,
    hostClubName,
    coHostClubName,
    projectAvenue,
    noOfBenifeshiers,
    speaker,
    totalAmountSpent,
    projectPhotoLink,
    projectDescription,
    presidentName,
    secretaryName,
    projectMonth,
    totalManHourSpent,
    venue,
  } = req.body;

  const newProject = new Project({
    projectName,
    projectChairName,
    projectSecretaryName,
    hostClubName,
    coHostClubName,
    projectAvenue,
    noOfBenifeshiers,
    speaker,
    totalAmountSpent,
    projectPhotoLink,
    projectDescription,
    presidentName,
    secretaryName,
    projectMonth,
    totalManHourSpent,
    venue,
  });

  try {
    await newProject.save();
    res.status(200).json({ message: "Project created successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error creating project", error: err });
  }
};

exports.getAllProject = (req, res, next) => {
  var query = {};
  projectSevice.getAllProject(query).then((doc) => {
    res.status(200).json(doc);
  });
};

exports.deleteProjecct = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    projectSevice
      .deleteProjecct(req)
      .then((doc) => {
        logger.info(
          "delete project Success Date:",
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

exports.updateProject = async (req, res, next) => {
  const { id } = req.params;
  const {
    projectName,
    projectChairName,
    projectSecretaryName,
    hostClubName,
    coHostClubName,
    projectAvenue,
    noOfBenifeshiers,
    speaker,
    totalAmountSpent,
    projectPhotoLink,
    projectDescription,
    presidentName,
    secretaryName,
    projectMonth,
    totalManHourSpent,
    venue,
  } = req.body;

  try {
    // Find the project by ID and update it with new data
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        projectName,
        projectChairName,
        projectSecretaryName,
        hostClubName,
        coHostClubName,
        projectAvenue,
        noOfBenifeshiers,
        speaker,
        totalAmountSpent,
        projectPhotoLink,
        projectDescription,
        presidentName,
        secretaryName,
        projectMonth,
        totalManHourSpent,
        venue,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project updated successfully!",
      project: updatedProject,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating project", error: err });
  }
};
