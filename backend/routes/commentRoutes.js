import express from "express"
import { addComment, getCommentsByPost } from "../controllers/commentController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

//Add a comment to post
router.post("/:postId", protect, addComment);


//Get all comments for a post
router.get("/:postId", getCommentsByPost);

export default router;