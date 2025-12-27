import express from "express";

import {
  createProject,
  getAllProjects,
  getMyProjects,
  respondToProject,
  updateProjectProgress,
  completeProject,
} from "../controllers/project.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

/* ============================================================
   ADMIN ROUTES
============================================================ */

// Admin → assign project (create)
router.post(
  "/",
  protect,
  authorizeRoles("ADMIN"),
  createProject
);

// Admin → get all projects
router.get(
  "/",
  protect,
  authorizeRoles("ADMIN"),
  getAllProjects
);

// Admin → mark project completed
router.put(
  "/:id/complete",
  protect,
  authorizeRoles("ADMIN"),
  completeProject
);

/* ============================================================
   DEVELOPER ROUTES
============================================================ */

// Developer → get my projects
router.get(
  "/my",
  protect,
  authorizeRoles("DEVELOPER"),
  getMyProjects
);

// Developer → accept / reject project
router.put(
  "/:id/respond",
  protect,
  authorizeRoles("DEVELOPER"),
  respondToProject
);

// Developer → update progress
router.put(
  "/:id/progress",
  protect,
  authorizeRoles("DEVELOPER"),
  updateProjectProgress
);

// Developer → mark completed (optional)
router.put(
  "/:id/complete",
  protect,
  authorizeRoles("DEVELOPER"),
  completeProject
);

export default router;
