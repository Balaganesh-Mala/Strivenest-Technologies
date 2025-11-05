// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { protect, roleCheck } = require('../middleware/authMiddleware');

// Public route: clients submit quote
router.post('/', clientController.createQuote);

// Admin routes
router.get('/', protect, roleCheck(['Admin']), clientController.getAllQuotes);
router.put('/:id/status', protect, roleCheck(['Admin']), clientController.updateStatus);
router.delete('/:id', protect, roleCheck(['Admin']), clientController.deleteQuote);

module.exports = router;
