// routes/developerRoutes.js
const express = require('express');
const router = express.Router();
const developerController = require('../controllers/developerController');
const { protect, roleCheck } = require('../middleware/authMiddleware');

// Admin-only: get developers, add developer
router.get('/', protect, roleCheck(['Admin']), developerController.getDevelopers);
router.post('/', protect, roleCheck(['Admin']), developerController.addDeveloper);

module.exports = router;
