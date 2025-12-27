import ClientRequest from "../models/clientRequest.model.js";
import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import { generateProjectId } from "../utils/generateProjectId.js";


/* ================= GET ALL CLIENT REQUESTS ================= */
export const getAllClientRequests = async (req, res) => {
  const requests = await ClientRequest.find()
    .sort({ createdAt: -1 });

  res.json({ success: true, requests });
};

/* ================= APPROVE / REJECT REQUEST ================= */
export const updateRequestStatus = async (req, res) => {
  const { status, adminNotes } = req.body;

  if (!["APPROVED", "REJECTED"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const request = await ClientRequest.findById(req.params.id);
  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  request.requestStatus = status;
  request.adminNotes = adminNotes || null;
  await request.save();

  res.json({ success: true, message: `Request ${status.toLowerCase()}` });
};

/* ================= GET DEVELOPERS BY SERVICE ================= */
export const getEligibleDevelopers = async (req, res) => {
  const { serviceType } = req.query;

  if (!serviceType) {
    return res.status(400).json({ message: "Service type required" });
  }

  const developers = await User.find({
    role: "DEVELOPER",
    specializations: serviceType, // 🔥 FIX
    isActive: true,
    isAvailable: true,
  }).select("fullName email specializations");

  res.json({ success: true, developers });
};



/* ================= ASSIGN PROJECT ================= */
export const assignProject = async (req, res) => {
  const { requestId, developerId, startDate, deadline, priority, remarks } =
    req.body;

  const request = await ClientRequest.findById(requestId);
  if (!request || request.requestStatus !== "APPROVED") {
    return res.status(400).json({ message: "Request not approved" });
  }

  const developer = await User.findById(developerId);
  if (!developer || developer.role !== "DEVELOPER") {
    return res.status(400).json({ message: "Invalid developer" });
  }

  const projectId = await generateProjectId();

  const project = await Project.create({
    clientRequest: request._id,
    clientId: request.clientId,

    projectId,
    projectTitle: request.projectTitle,
    projectDetails:
      request.projectDetails || request.message || "No details provided",

    serviceType: request.serviceType,

    assignedDeveloper: developer._id,
    developerName: developer.fullName,

    // ✅ CORRECT STATUS FLOW
    projectStatus: "ASSIGNED",       // ADMIN assigns
    developerResponse: "PENDING",    // DEV must accept/reject

    startDate: startDate ? new Date(startDate) : new Date(),
    deadline: deadline ? new Date(deadline) : null,
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

