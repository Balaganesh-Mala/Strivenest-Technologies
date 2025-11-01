import express from "express";
import {
  createQuote,
  getAllQuotes,
  deleteQuote,
} from "../controllers/quoteController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/quotes
 * @desc    Submit a new quote request
 * @access  Public
 */
router.post("/", createQuote);

/**
 * @route   GET /api/quotes
 * @desc    Get all quotes (Admin only)
 * @access  Private
 */
router.get("/", verifyToken, getAllQuotes);

/**
 * @route   DELETE /api/quotes/:id
 * @desc    Delete a quote (Admin only)
 * @access  Private
 */
router.delete("/:id", verifyToken, deleteQuote);

export default router;
