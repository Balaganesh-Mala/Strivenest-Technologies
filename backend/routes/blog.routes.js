import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

/* ================= PUBLIC ================= */
router.get("/", getBlogs);
router.get("/:id", getBlogById);

/* ================= ADMIN ================= */
router.post(
  "/",
  protect,
  authorizeRoles("ADMIN"),
  upload.single("image"),
  createBlog
);

router.put(
  "/:id",
  protect,
  authorizeRoles("ADMIN"),
  upload.single("image"),
  updateBlog
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("ADMIN"),
  deleteBlog
);

export default router;
