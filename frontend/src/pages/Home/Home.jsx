import axios from "axios"
import './Home.css'
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Home = () => {

  const [posts, setPosts] = useState([])
  const [searchBlog, setSearchBlog] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("https://blogify-backend-wz2i.onrender.com/api/posts")
        setPosts(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPosts()
  }, [])

  //filter posts by title or content
  const filteredPosts = posts.filter(post => {
    const matchedSearch = 
    post.title.toLowerCase().includes(searchBlog.toLowerCase()) ||
    post.content.toLowerCase().includes(searchBlog.toLowerCase());

    const matchedCategory = selectedCategory ? post.category === selectedCategory : true;

    return matchedSearch && matchedCategory;
});

  return (
    <div className="hero-section">
     <div className="welcome-content">
      <p className="feature">New post categories added! <i className="fa-solid fa-star"></i>  </p>
      <h1>Turn Your <span>Thoughts</span> into <br />Stories</h1>
      <p>This is your space to think out loud, to share what matters, and to write without filters. Whether <br />
      its one word oor a thousand, you story starts here.</p>
      <br />
      <div className="search-bar">
        <input 
        type="text" 
        placeholder="Search for blogs" 
        value={searchBlog}
        onChange={(e) => setSearchBlog(e.target.value)}
        />
        <button>Search</button>
      </div>
     </div>
    
      <div className="categories">
        <ul>
          <li onClick={() => setSelectedCategory("Technology")}>Technology</li>
          <li onClick={() => setSelectedCategory("Travel")}>Travel</li>
          <li onClick={() => setSelectedCategory("Lifestyle")}>Lifestyle</li>
          <li onClick={() => setSelectedCategory("Food")}>Food</li>
          <li onClick={() => setSelectedCategory("Education")}>Education</li>
          <li onClick={() => setSelectedCategory("Health & Fitness")}>Health & Fitness</li>
          <li onClick={() => setSelectedCategory("Entertainment")}>Entertainment</li>
          <li onClick={() => setSelectedCategory("Science")}>Science</li>
        </ul>
        </div>
        <div className="display-blogs">
          <div className="post-card">
            {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <div key={post._id} className="post-card">

                <Link to={`/posts/${post._id}`}>
                <img
                src={post.image ? `https://blogify-backend-wz2i.onrender.com${post.image}` : "/default-placeholder.png" } 
                alt={post.title} 
                className="post-image" 
                />
                </Link>

                <span>{post.category}</span>

                <h3>
                  <Link to={`/posts/${post._id}`} className="post-title">{post.title}</Link>
                  </h3>
                <p>{post.content.slice(0,100)}...</p>
                <span>By {post.author?.username || "Anonymous"}</span>
                
              </div>
            ))
          ) : (
            <p>No posts found.</p>
          )}
          </div>
        </div>
    </div>
  )
}

export default Home
