import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    /* ================= REFERENCES ================= */
    clientRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientRequest",
      required: true,
    },

    clientId: {
      type: String,
      required: true,
      index: true,
    },

    /* ================= IDENTIFICATION ================= */
    projectId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    projectTitle: {
      type: String,
      required: true,
      trim: true,
    },

    /* ================= CLIENT SNAPSHOT ================= */
    clientProjectDescription: {
      type: String,
      required: false,
    },

    /* ================= ADMIN-EDITABLE SCOPE ================= */
    projectDetails: {
      type: String,
      default: "",
    },

    /* ================= DOCUMENTS (ADMIN ONLY) ================= */
    projectDocuments: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    /* ================= SERVICE ================= */
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

    developerName: {
      type: String,
      default: null,
    },

    developerResponse: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING",
    },

    /* ================= PROJECT STATUS ================= */
    projectStatus: {
      type: String,
      enum: ["ASSIGNED", "IN_PROGRESS", "COMPLETED", "REJECTED"],
      default: "ASSIGNED",
    },

    /* ================= PLANNING ================= */
    startDate: {
      type: Date,
      default: null, // planned start
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

    /* ================= EXECUTION ================= */
    progressPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    startedAt: {
      type: Date,
      default: null, // actual start
    },

    completedAt: {
      type: Date,
      default: null,
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

    /* ================= AUDIT ================= */
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
