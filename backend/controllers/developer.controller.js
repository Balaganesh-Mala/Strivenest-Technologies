import Project from "../models/project.model.js";
import User from "../models/user.model.js";

/* ================= GET MY PROJECTS ================= */
export const getMyProjects = async (req, res) => {
  const projects = await Project.find({
    assignedDeveloper: req.user._id,
    isActive: true,
  })
    .populate("clientRequest", "projectDescription")
    .sort({ createdAt: -1 });

  const formatted = projects.map((p) => ({
    ...p.toObject(),
    clientProjectDescription:
      p.clientRequest?.projectDescription || null,
  }));

  res.json({
    success: true,
    projects: formatted,
  });
};


/* ================= ACCEPT / REJECT PROJECT ================= */
export const respondToProject = async (req, res) => {
  const { response } = req.body;

  if (!["ACCEPTED", "REJECTED"].includes(response)) {
    return res.status(400).json({ message: "Invalid response" });
  }

  const project = await Project.findOne({
    _id: req.params.id,
    assignedDeveloper: req.user._id,
  });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.developerResponse !== "PENDING") {
    return res.status(400).json({ message: "Project already responded" });
  }

  project.developerResponse = response;

  if (response === "ACCEPTED") {
    project.projectStatus = "IN_PROGRESS";
    project.startedAt = new Date();
  } else {
    project.projectStatus = "REJECTED";

    // Reduce count if rejected
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { currentProjectsCount: -1 },
    });
  }

  await project.save();

  res.json({
    success: true,
    message: `Project ${response.toLowerCase()}`,
  });
};

/* ================= UPDATE PROGRESS ================= */
export const updateProgress = async (req, res) => {
  const { progressPercentage, developerNotes } = req.body;

  if (progressPercentage < 0 || progressPercentage > 100) {
    return res.status(400).json({ message: "Invalid progress value" });
  }

  const project = await Project.findOne({
    _id: req.params.id,
    assignedDeveloper: req.user._id,
    projectStatus: "IN_PROGRESS",
  });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  project.progressPercentage = progressPercentage;
  if (developerNotes) project.developerNotes = developerNotes;

  await project.save();

  res.json({
    success: true,
    message: "Progress updated",
  });
};

/* ================= MARK PROJECT COMPLETED ================= */
export const markProjectCompleted = async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.id,
    assignedDeveloper: req.user._id,
    projectStatus: "IN_PROGRESS",
  });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  project.projectStatus = "COMPLETED";
  project.progressPercentage = 100;
  project.completedAt = new Date();

  await project.save();

  // Reduce active project count
  await User.findByIdAndUpdate(req.user._id, {
    $inc: { currentProjectsCount: -1 },
  });

  res.json({
    success: true,
    message: "Project marked as completed",
  });
};
