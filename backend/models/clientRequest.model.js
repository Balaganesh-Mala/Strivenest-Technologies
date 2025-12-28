import mongoose from "mongoose";

const clientRequestSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    clientId: {
      type: String,
      required: true,
      index: true,
    },

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

    projectTitle: {
      type: String,
      required: true,
      trim: true,
    },

    clientProjectDescription: {
  type: String,
  required: true,
},


    estimatedBudget: {
      type: Number,
      default: null,
    },

    expectedTimeline: {
      type: String,
      default: null,
    },

    requestStatus: {
      type: String,
      enum: ["NEW", "APPROVED", "REJECTED", "ASSIGNED"],
      default: "NEW",
    },

    adminNotes: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ClientRequest", clientRequestSchema);
