import express from "express";
import { developerLogin } from "../controllers/developerAuth.controller.js";

const router = express.Router();

// POST /api/developer-auth/login
router.post("/login", developerLogin);

export default router;
