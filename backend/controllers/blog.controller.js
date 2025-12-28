import Blog from "../models/Blog.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";

/* ================= CREATE BLOG ================= */
export const createBlog = async (req, res) => {
  try {
    const { title, content, category, status } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    let imageData = {};

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "blogs",
        }
      );

      imageData = {
        image: result.secure_url,
        imagePublicId: result.public_id,
      };
    }

    const blog = await Blog.create({
      title,
      content,
      category,
      status,
      ...imageData,
    });

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (err) {
    console.error("Create Blog Error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= UPDATE BLOG ================= */
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // If new image uploaded → delete old one
    if (req.file && blog.imagePublicId) {
      await cloudinary.uploader.destroy(blog.imagePublicId);
    }

    let imageData = {};
    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "blogs",
        }
      );

      imageData = {
        image: result.secure_url,
        imagePublicId: result.public_id,
      };
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        ...req.body,
        ...imageData,
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: updatedBlog,
    });
  } catch (err) {
    console.error("Update Blog Error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= DELETE BLOG ================= */
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Delete image from Cloudinary
    if (blog.imagePublicId) {
      await cloudinary.uploader.destroy(blog.imagePublicId);
    }

    await blog.deleteOne();

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (err) {
    console.error("Delete Blog Error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get all blogs (Public – only Published)
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "Published" })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: blogs,
    });
  } catch (err) {
    console.error("Get Blogs Error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get single blog by ID







export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent invalid MongoDB ObjectId crash
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      data: blog,
    });
  } catch (err) {
    console.error("Get Blog Error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};