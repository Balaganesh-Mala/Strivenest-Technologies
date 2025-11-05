// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect, roleCheck } = require('../middleware/authMiddleware');

// Admin creates project assignment
router.post('/', protect, roleCheck(['Admin']), projectController.createProject);

// Admin views all projects
router.get('/', protect, roleCheck(['Admin']), projectController.getAllProjects);

// Developer-specific view (developerId param)
router.get('/developer/:id', protect, roleCheck(['Developer','Admin']), projectController.getProjectsByDeveloper);

// Update project status (admin or developer)
router.put('/:id/status', protect, projectController.updateProjectStatus);

// Update project info (admin)
router.put('/:id', protect, roleCheck(['Admin']), projectController.updateProject);

module.exports = router;
