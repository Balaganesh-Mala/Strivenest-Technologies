import express from "express";
import {
  createQuote,
  getAllQuotes,
  updateQuoteStatus,
  deleteQuote,
} from "../controllers/quoteController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", createQuote);
router.get("/", getAllQuotes);
router.put("/:id", updateQuoteStatus)
router.delete("/:id", verifyToken, deleteQuote);

export default router;
