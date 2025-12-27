import express from "express";
import {
  getMyProjects,
  respondToProject,
  updateProgress,
  markProjectCompleted,
} from "../controllers/developer.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(protect, authorizeRoles("DEVELOPER"));

router.get("/projects", getMyProjects);
router.put("/projects/:id/respond", respondToProject);
router.put("/projects/:id/progress", updateProgress);
router.put("/projects/:id/complete", markProjectCompleted);

export default router;
