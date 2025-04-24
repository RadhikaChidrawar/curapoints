// routes/blogRoutes.js
import express from 'express';
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  getBlogById
} from '../controllers/blogController.js';

const router = express.Router();

// Admin Routes
router.post('/blog', createBlog);         // Create
router.get('/blogs', getBlogs);           // Read
router.get('/blog/:id', getBlogById);
router.put('/blog/:id', updateBlog);      // Update
router.delete('/blog/:id', deleteBlog);   // Delete
// routes/blogRoutes.js
// router.get('/blog/:id', getBlogById); // To get a specific blog
// router.put('/blog/:id', updateBlog);  // To update a specific blog


export default router;
