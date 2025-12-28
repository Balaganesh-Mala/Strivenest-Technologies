import Project from "../models/project.model.js";
import ClientRequest from "../models/clientRequest.model.js";
import User from "../models/user.model.js";
import axios from "axios";

import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

import mongoose from "mongoose";

/* ================= HELPER ================= */
const generateProjectId = async () => {
  const count = await Project.countDocuments();
  return `PRJ-${new Date().getFullYear()}-${String(count + 1).padStart(
    3,
    "0"
  )}`;
};

/* ================= CREATE / ASSIGN PROJECT ================= */
export const createProject = async (req, res) => {
  try {
    const { requestId, developerId, startDate, deadline, priority, remarks } =
      req.body;

    /* ================= VALIDATE REQUEST ================= */
    const request = await ClientRequest.findById(requestId);
    if (!request || request.requestStatus !== "APPROVED") {
      return res.status(400).json({
        success: false,
        message: "Client request not approved or not found",
      });
    }

    /* ================= VALIDATE DEVELOPER ================= */
    const developer = await User.findById(developerId);
    if (!developer || developer.role !== "DEVELOPER") {
      return res.status(400).json({
        success: false,
        message: "Invalid developer",
      });
    }

    /* ================= GENERATE PROJECT ID ================= */
    const projectId = await generateProjectId();

    /* ================= CREATE PROJECT ================= */
    const project = await Project.create({
      /* References */
      clientRequest: request._id,
      clientId: request.clientId,

      /* Identity */
      projectId,
      projectTitle: request.projectTitle,

      /* 🔑 SNAPSHOT (IMMUTABLE) */
      clientProjectDescription: request.clientProjectDescription,

      /* Admin editable later */
      projectDetails: "",

      /* Service */
      serviceType: request.serviceType,

      /* Assignment */
      assignedDeveloper: developer._id,
      developerName: developer.fullName,
      developerResponse: "PENDING",
      projectStatus: "ASSIGNED",

      /* Planning (Admin) */
      startDate: startDate || null,
      deadline: deadline || null,
      priority: priority || "Medium",
      remarks: remarks || null,

      /* Progress */
      progressPercentage: 0,

      /* Audit */
      assignedBy: req.user._id,
    });

    /* ================= UPDATE REQUEST STATUS ================= */
    request.requestStatus = "ASSIGNED";
    await request.save();

    /* ================= UPDATE DEVELOPER LOAD ================= */
    developer.currentProjectsCount += 1;
    await developer.save();

    res.status(201).json({
      success: true,
      message: "Project assigned successfully",
      project,
    });
  } catch (error) {
    console.error("Create Project Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
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

export const uploadProjectDocument = async (req, res) => {
  try {
    console.log("📂 Upload API HIT");

    if (!req.file) {
      return res.status(400).json({ message: "No file received" });
    }

    // 🔐 EXTRA SAFETY: Allow ONLY PDF
    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        message: "Only PDF files are allowed",
      });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ☁️ Upload PDF to Cloudinary (RAW)
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "project-documents",
          resource_type: "raw",
          use_filename: true,
          unique_filename: true,
        },
        (error, uploaded) => {
          if (error) reject(error);
          else resolve(uploaded);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    // 📄 Save metadata in DB
    project.projectDocuments.push({
      name: req.file.originalname,
      url: result.secure_url,
      publicId: result.public_id,
      fileType: "pdf",
      mimeType: req.file.mimetype,
      size: req.file.size,
    });

    await project.save();

    res.json({
      success: true,
      message: "PDF uploaded successfully",
    });
  } catch (error) {
    console.error("🔥 PDF UPLOAD ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload PDF",
    });
  }
};


/* =========================================================
   ADMIN: DELETE PROJECT DOCUMENT
========================================================= */
export const deleteProjectDocument = async (req, res) => {
  try {
    const { projectId, documentId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(projectId) ||
      !mongoose.Types.ObjectId.isValid(documentId)
    ) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const document = project.projectDocuments.id(documentId);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    await cloudinary.uploader.destroy(document.publicId, {
      resource_type: "raw",
    });

    document.deleteOne();
    await project.save();

    res.json({
      success: true,
      message: "PDF deleted successfully",
    });
  } catch (error) {
    console.error("🔥 DELETE ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


/* ================= ADMIN: UPDATE PROJECT DETAILS ================= */
export const updateProjectDetails = async (req, res) => {
  const { projectDetails } = req.body;

  if (!projectDetails) {
    return res.status(400).json({ message: "Project details required" });
  }

  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  project.projectDetails = projectDetails;

  await project.save();

  res.json({
    success: true,
    message: "Project details updated",
    project,
  });
};



export const downloadProjectDocument = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const doc = project.projectDocuments.id(req.params.docId);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${doc.name}"`
    );

    const cloudinaryResponse = await axios.get(doc.url, {
      responseType: "stream",
    });

    cloudinaryResponse.data.pipe(res);
  } catch (err) {
    console.error("PDF STREAM ERROR:", err);
    res.status(500).json({ message: "Failed to load PDF" });
  }
};


