const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { protect, roleCheck } = require('../middleware/authMiddleware');

// Public routes (frontend)
router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);

// Admin routes
router.post('/', protect, roleCheck(['Admin']), blogController.createBlog);
router.put('/:id', protect, roleCheck(['Admin']), blogController.updateBlog);
router.delete('/:id', protect, roleCheck(['Admin']), blogController.deleteBlog);

module.exports = router;
