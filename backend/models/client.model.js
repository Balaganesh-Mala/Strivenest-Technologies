import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      unique: true,
      required: true,
      index: true, // fast lookup
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type: String,
      trim: true,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Client", clientSchema);
