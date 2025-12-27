import express from "express";
import { submitClientRequest } from "../controllers/clientRequest.controller.js";

const router = express.Router();

// Public endpoint
router.post("/request", submitClientRequest);

export default router;
