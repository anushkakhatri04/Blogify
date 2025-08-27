import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import upload from '../middlewares/uploadMiddleware.js';

// Create new post
export const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const post = new Post({
      title,
      content,
      author: req.user._id,
      category,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the logged in user is the owner
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to update this post" });
    }

    // Update fields
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.category = req.body.category || post.category;
    post.image = req.body.image || post.image;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if logged in user is the owner
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this post" });
    }

    await post.deleteOne();
    res.json({ message: "Post removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Single post with details + comments
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username email");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comments = await Comment.find({ post: post._id })
      .populate("user", "username email")
      .sort({ createdAt: -1 }); // newest first

    res.json({ post, comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get MyPosts
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id })
    .sort({ createdAt: -1 })
    .populate ({
      path: "comments",
      select: "_id content user createdAt",
      populate: { path: "user", select: "username" }
    });
    res.json(posts);
  } catch(error) {
    res.status(500).json({message: error.message})
  }
};