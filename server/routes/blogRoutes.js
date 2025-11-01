import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/blogs
 * @desc    Create a new blog post
 * @access  Private (Admin)
 */
router.post("/", verifyToken, createBlog);

/**
 * @route   GET /api/blogs
 * @desc    Get all blog posts
 * @access  Public
 */
router.get("/", getAllBlogs);

/**
 * @route   GET /api/blogs/:id
 * @desc    Get a single blog by ID
 * @access  Public
 */
router.get("/:id", getBlogById);

/**
 * @route   PUT /api/blogs/:id
 * @desc    Update a blog post
 * @access  Private (Admin)
 */
router.put("/:id", verifyToken, updateBlog);

/**
 * @route   DELETE /api/blogs/:id
 * @desc    Delete a blog post
 * @access  Private (Admin)
 */
router.delete("/:id", verifyToken, deleteBlog);

export default router;
