import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  deleteAdmin,
  getAllAdmins,
  updateAdminProfile,
} from "../controllers/adminController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile", verifyToken, getAdminProfile);
router.get("/", verifyToken, getAllAdmins);
router.put("/profile", verifyToken, updateAdminProfile);
router.delete("/:id", verifyToken, deleteAdmin);

export default router;
