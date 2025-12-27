import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    /* ================= CLIENT REFERENCE ================= */
    clientRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientRequest",
      required: true,
    },

    // Shared with developer (safe)
    clientId: {
      type: String,
      required: true,
      index: true,
    },

    /* ================= PROJECT IDENTIFICATION ================= */
    projectId: {
      type: String,
      unique: true,
      index: true,
      required: true, // e.g. PRJ-2025-001
    },

    projectTitle: {
      type: String,
      required: true,
      trim: true,
    },

    projectDetails: {
      type: String,
      required: true,
    },

    /* ================= SERVICE INFO ================= */
    serviceType: {
      type: String,
      enum: [
        "WEB_DEVELOPMENT",
        "APP_DEVELOPMENT",
        "MARKETING",
        "CLOUD",
        "UI_UX",
        "OTHER",
      ],
      required: true,
    },

    /* ================= DEVELOPER ASSIGNMENT ================= */
    assignedDeveloper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Optional denormalized (for faster UI)
    developerName: {
      type: String,
      default: null,
    },

    developerResponse: {
      type: String,
      
      default: "PENDING",
    },

    /* ================= PROJECT STATUS ================= */
    projectStatus: {
      type: String,
      
      default: "ASSIGNED",
    },

    /* ================= PLANNING ================= */
    startDate: {
      type: Date,
      default: Date.now,
    },

    deadline: {
      type: Date,
      default: null,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    remarks: {
      type: String,
      default: null,
    },

    /* ================= PROGRESS TRACKING ================= */
    progressPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    /* ================= NOTES ================= */
    adminNotes: {
      type: String,
      default: null,
    },

    developerNotes: {
      type: String,
      default: null,
    },

    /* ================= COMPLETION ================= */
    startedAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    /* ================= AUDIT ================= */
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
