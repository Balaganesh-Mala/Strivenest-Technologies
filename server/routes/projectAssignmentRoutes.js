import express from "express";
import {
  createAssignment,
  getAllAssignments,
  updateAssignmentStatus,
  deleteAssignment,
} from "../controllers/projectAssignment.js";

const router = express.Router();

router.post("/", createAssignment);         // POST → /api/assignments
router.get("/", getAllAssignments);         // GET → /api/assignments
router.put("/:id", updateAssignmentStatus); // PUT → /api/assignments/:id
router.delete("/:id", deleteAssignment);    // DELETE → /api/assignments/:id

export default router;
