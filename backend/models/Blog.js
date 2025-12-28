import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String }, // Cloudinary URL
    imagePublicId: { type: String }, // Cloudinary ID
    author: { type: String, default: "Admin" },
    category: { type: String, default: "General" },
    status: {
      type: String,
      enum: ["Published", "Draft"],
      default: "Published",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
