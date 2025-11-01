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


router.post("/", verifyToken, createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.put("/:id", updateBlog);
router.delete("/:id", verifyToken, deleteBlog);

export default router;
