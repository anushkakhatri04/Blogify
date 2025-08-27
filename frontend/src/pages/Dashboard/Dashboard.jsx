import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import axios from "axios"
import './Dashboard.css'


const Dashboard = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
           console.log("No user or token in localStorage");
        return;
      }
        const res = await axios.get("https://blogify-backend-wz2i.onrender.com/api/posts/myposts", {
          headers: { Authorization: `Bearer ${ user.token || user.accessToken } ` },
        });
        console.log("Fetched posts:", res.data);
      setPosts(res.data.posts || res.data);
       } catch (err) {
      console.error("Error fetching posts:", err.response?.data || err.message);
    }
    };
    fetchPosts();
  }, []);

  

  const handleDelete = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if(!user || !user.token) 
        return;

      await axios.delete(`https://blogify-backend-wz2i.onrender.com/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      //Removing deleted post from ui
      setPosts(posts.filter((post) => post._id !== id));
    } catch(err) {
      console.log("Error deleting post", err.response?.data || err.message)
    }
  };

  return (
    <div className='dashboard'>
      {/* Sidebar */}
      <aside className='sidebar'>
        <h2 className='logo'>Blogify</h2>
        <ul>
            <li>📊 Dashboard</li>
          <li><Link to="/add">➕ Add blog</Link></li>
          <li><Link to="/myposts">📃 Blog list</Link></li>
          <li>💬 Comments</li>
        </ul>
      </aside>
      
      <main className='main-content'>
        <div className="stats">
          <div className="stat-card">
            <h3>{posts.length}</h3>
            <p>Blogs</p>
          </div>
          <div className="stat-card">
            <h3>
              {posts.reduce((total, post) => total + (post.comments?.length || 0), 0)}
            </h3>
            <p>Comments</p>
          </div>
        </div>

        {/* Latest Blogs */}
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
            <tbody>
              {posts.map((post, idx) => (
                <tr key={post._id}>
                  <td>{idx+1}</td>
                  <td><Link to={`/posts/${post._id}`}>{post.title}</Link></td>
                  <td>{new Date(post.createdAt).toDateString()}</td>
                  <td className='status'>Published</td>
                  <td>
                    <button onClick={() => handleDelete(post._id)} className='btn-delete'>Delete ✖</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
