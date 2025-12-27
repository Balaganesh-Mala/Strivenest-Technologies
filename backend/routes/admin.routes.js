import express from "express";
import {
  getAllClientRequests,
  updateRequestStatus,
  getEligibleDevelopers,
  assignProject,
} from "../controllers/admin.controller.js";

import {
  createDeveloper,
  getAllDevelopers,
  updateDeveloperStatus,
} from "../controllers/adminDeveloper.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(protect, authorizeRoles("ADMIN"));

/* ================= CLIENT REQUESTS ================= */
router.get("/requests", getAllClientRequests);
router.put("/requests/:id/status", updateRequestStatus);

/* ================= PROJECT ASSIGNMENT ================= */
router.post("/projects/assign", assignProject);

/* ================= DEVELOPER MANAGEMENT ================= */
router.post("/developers", createDeveloper);          // ✅ CREATE
router.get("/developers/all", getAllDevelopers);      // ✅ LIST
router.put("/developers/:id/status", updateDeveloperStatus);

/* ================= ELIGIBLE DEVELOPERS (ASSIGNMENT) ================= */
router.get(
  "/developers/eligible",
  (req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
  },
  getEligibleDevelopers
);


export default router;
