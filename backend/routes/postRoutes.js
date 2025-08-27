import express from 'express'
import { createPost, deletePost, getMyPosts, getPostById, getPosts, updatePost } from '../controllers/postController.js'
import protect from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Create a new post
router.post("/", protect, upload.single("image"), createPost);


//GET logged in user's posts
router.get("/myposts", protect, getMyPosts)

// Update a new post
router.put("/:id", protect, upload.single("image"), updatePost);

// Delete a post
router.delete("/:id", protect, deletePost);


// View single post
router.get("/:id", getPostById);

// Get all posts
router.get("/", getPosts);


export default router;