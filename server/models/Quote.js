import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    service: {
      type: String,
      required: [true, "Service is required"],
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Declined", "Assigned","Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// ✅ FIX: prevent model overwrite errors
const Quote = mongoose.models.Quote || mongoose.model("Quote", quoteSchema);

export default Quote;
