import Comment from '../models/Comment.js'
import Post from '../models/Post.js'


//Add a comment
export const addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { postId }  = req.params;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comment = await Comment.create({
            post: postId, 
            user: req.user._id,
            content,
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get all comments for a post
export const getCommentsByPost = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId})
        .populate("user", "username email")
        .sort({ createdAt: -1 }) //newest first

        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
