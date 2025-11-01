import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    description: {
      type: String,
      required: [true, "Short description is required"],
      maxlength: 300,
    },
    content: {
      type: String,
      required: [true, "Full content is required"],
    },
    author: {
      type: String,
      default: "Admin",
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
