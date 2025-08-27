import React, { useState, useEffect } from 'react'
import axios from "axios"
import './MyPosts.css'
import { Link } from 'react-router-dom'

const MyPosts = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
           console.log("No user or token in localStorage");
        return;
      }
        const res = await axios.get("http://localhost:8080/api/posts/myposts", {
          headers: { Authorization: `Bearer ${ user.token || user.accessToken } ` },
        });
        console.log("Fetched posts:", res.data);
      setPosts(res.data.posts || res.data);
       } catch (err) {
      console.error("Error fetching posts:", err.response?.data || err.message);
    }
    };
    fetchPosts();
  }, [])

  return (
    <div className='myposts-container'>
      <div className="stats">
        <div className="stat-card">
          <h3>{posts.length}</h3>
          <p>Blogs</p>
        </div>
        <div className="stat-card">
          <h3>0</h3>
          <p>Comments</p>
        </div>
        <div className="stat-card">
          <h3>0</h3>
          <p>Drafts</p>
        </div>
      </div>
      <div className="blogs-table">
        <h2>Latest Blogs</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Blog Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{posts.map((post, idx) => (
            <tr key={post._id}>
              <td>{idx+1}</td>
              <td>{post.title}</td>
              <td>{new Date(post.createdAt).toDateString()}</td>
               <td className='status'>Published</td>
               <td>
               <Link to={`/edit/${post._id}`}><button  className='btn-edit'>Edit<i className="fa-solid fa-pencil"></i></button>  </Link>   
               </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyPosts
