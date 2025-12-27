import express from "express";
import { registerAdmin, adminLogin } from "../controllers/adminAuth.controller.js";

const router = express.Router();

// Protected by admin secret key
router.post("/register", registerAdmin);
router.post("/login", adminLogin);

export default router;
