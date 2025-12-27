import Project from "../models/project.model.js";
import ClientRequest from "../models/clientRequest.model.js";
import User from "../models/user.model.js";

/* ================= HELPER ================= */
const generateProjectId = async () => {
  const count = await Project.countDocuments();
  return `PRJ-${new Date().getFullYear()}-${String(count + 1).padStart(3, "0")}`;
};

/* ================= CREATE / ASSIGN PROJECT ================= */
export const createProject = async (req, res) => {
  const {
    requestId,
    developerId,
    startDate,
    deadline,
    priority,
    remarks,
  } = req.body;

  const request = await ClientRequest.findById(requestId);
  if (!request || request.requestStatus !== "APPROVED") {
    return res.status(400).json({ message: "Request not approved" });
  }

  const developer = await User.findById(developerId);
  if (!developer || developer.role !== "DEVELOPER") {
    return res.status(400).json({ message: "Invalid developer" });
  }

  // 🔑 Generate projectId
  const projectId = await generateProjectId();

  const project = await Project.create({
    clientRequest: request._id,
    clientId: request.clientId,

    projectId, // ✅ FIXED
    projectTitle: request.projectTitle,
    projectDetails: request.projectDetails,
    serviceType: request.serviceType,

    assignedDeveloper: developer._id,
    developerName: developer.fullName, // ✅ FIXED

    projectStatus: "ASSIGNED", // ✅ FIXED

    startDate: startDate || new Date(),
    deadline: deadline || null,
    priority: priority || "Medium",
    remarks: remarks || null,

    assignedBy: req.user._id,
  });

  request.requestStatus = "ASSIGNED";
  await request.save();

  developer.currentProjectsCount += 1;
  await developer.save();

  res.status(201).json({
    success: true,
    message: "Project assigned successfully",
    project,
  });
};


/* ===============================================================
   ADMIN: GET ALL PROJECTS
================================================================ */
export const getAllProjects = async (req, res) => {
  const projects = await Project.find()
    .sort({ createdAt: -1 })
    .populate("assignedDeveloper", "fullName email");

  res.json({ success: true, projects });
};

/* ===============================================================
   DEVELOPER: GET MY PROJECTS
================================================================ */
export const getMyProjects = async (req, res) => {
  const projects = await Project.find({
    assignedDeveloper: req.user._id,
    isActive: true,
  }).sort({ createdAt: -1 });

  res.json({ success: true, projects });
};

/* ===============================================================
   DEVELOPER: ACCEPT / REJECT PROJECT
================================================================ */
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
    return res.status(400).json({ message: "Already responded" });
  }

  project.developerResponse = response;

  if (response === "ACCEPTED") {
    project.projectStatus = "IN_PROGRESS";
    project.startedAt = new Date();
  } else {
    project.projectStatus = "REJECTED";

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

/* ===============================================================
   DEVELOPER: UPDATE PROGRESS
================================================================ */
export const updateProjectProgress = async (req, res) => {
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

  res.json({ success: true, message: "Progress updated" });
};

/* ===============================================================
   ADMIN / DEVELOPER: MARK COMPLETED
================================================================ */
export const completeProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  project.projectStatus = "COMPLETED";
  project.progressPercentage = 100;
  project.completedAt = new Date();

  await project.save();

  await User.findByIdAndUpdate(project.assignedDeveloper, {
    $inc: { currentProjectsCount: -1 },
  });

  res.json({ success: true, message: "Project completed" });
};
