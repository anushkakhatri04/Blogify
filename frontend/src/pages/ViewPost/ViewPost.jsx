import React, { useEffect, useState } from 'react'
import './ViewPost.css'
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from 'axios'

const ViewPost = () => {

  const { id }  = useParams();
  const navigate = useNavigate(); 
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`https://blogify-backend-wz2i.onrender.com/api/posts/${id}`);
        setPost(res.data.post);
      } catch(err) {
        console.error("Error fetching post:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

     const fetchComments = async () => {
    try {
      const res = await axios.get(`https://blogify-backend-wz2i.onrender.com/api/comments/${id}`);
      setComments(res.data);
    } catch(err) {
      console.error("Error fetching comments:", err.response?.data || err.message);
    }
  }; 

    fetchPost();
    fetchComments();
  }, [id]);

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.delete(`https://blogify-backend-wz2i.onrender.com/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      navigate("/myposts");
    } catch(err) {
      console.error("Error deleting post", err.response?.data || err.message);
    }
  };const handleAddComment = async (e) => {
    e.preventDefault ();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post(`https://blogify-backend-wz2i.onrender.com/api/comments/${id}`, 
        { content: newComment },
        { headers: {Authorization: `Bearer ${user.token}`}}
      );
      setComments([res.data, ...comments]);
      setNewComment("");
    }catch(err) {
      console.error("Error adding comment", err.response?.data || err.message);
    }
  };

  if(loading) return <p>Loading...</p>;
  if(!post) return <p>Post not found.</p>;

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className='post-details'>
      <h1>{post.title}</h1>
       <p><strong>Category:</strong> {post.category}</p>
        <p>{post.content}</p>
         {post.image && <img src={`https://blogify-backend-wz2i.onrender.com${post.image}`} alt={post.title} />}
         {/* Show Edit/Delete only if logged-in user is the author */}
      {user && post.author && user._id === post.author._id && (
        <div className="actions">
          <Link to={`/edit/${post._id}`} className="btn-edit">✏️ Edit</Link>
          <button onClick={handleDelete} className="btn-delete">🗑 Delete</button>
        </div>
      )}

      {/* Commment Section */}

      <div className="comment-section">
        <h2>Comments</h2>
        {user ? (
          <form className='comment-form' onSubmit={handleAddComment}>
            <textarea placeholder='Write a comment...' value={newComment} onChange={(e) => setNewComment(e.target.value)} required />
            <button type='submit'>Add Comment</button>
          </form>
        ) : (
          <p><Link to="/login">Login</Link></p>
        )}

        <div className="comments-list">
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((c) => (
              <div key={c._id} className='comment'>
                <p><strong>{c.user?.username || "Unknown"}:</strong> {c.content}</p>
                <small>{new Date(c.createdAt).toLocaleString()}</small>
              </div>
            ))
          )} 
        </div>
      </div>
    </div>
  );
}

export default ViewPost
