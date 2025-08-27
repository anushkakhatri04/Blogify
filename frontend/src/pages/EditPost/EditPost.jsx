import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom"
import { assets } from '../../assets/assets';
import './EditPost.css'


const EditPost = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);


  useEffect(() => {
    const fetchPost = async() => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(`http://localhost:8080/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const post = res.data.post || res.data;
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category);
        if (post.image) setPreview(`http://localhost:8080${post.image}`);
      }catch (err) {
        console.error("Error fetching post:", err.response?.data || err.message);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if(!user || !user.token) 
        return;

      await axios.delete(`http://localhost:8080/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      //Removing deleted post from ui
      alert("Blog deleted successflly!");
      navigate("/myposts");
    } catch(err) {
      console.log("Error deleting post", err.response?.data || err.message);
      alert("Failed to delete blog.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      if(thumbnail) formData.append("image", thumbnail);

      //put request for updating/editing

      await axios.put(`https://blogify-backend-wz2i.onrender.com/api/posts/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
      });

      alert("Post edited successfully!");
      navigate("/myposts");
    } catch (error) {
       console.error(error);
      alert("Failed to edit post.");
    }
  };

  return (
    <div className='add-post-page'>
      <h1>Edit Blog</h1>

      <form onSubmit={handleSubmit} className='add-post-form'>
        <div className="thumbnail-upload">
          {preview ? (
            <img src={preview} alt='Thumbnail Preview' className='thumbnail-preview' />
          ) : (
            <label className='upload-label'>
              <input type="file" accept='image/*' onChange={handleImageUpload} hidden />
              <div className="upload-placeholder">
                <img src={assets.upload_area} alt="img-upload" />
                <span>Upload Thumbnail</span>
              </div>
            </label>
          )}
        </div>

        {/* TITLE */}
        <input 
        type="text"
        placeholder='Blog Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        />

        {/* CONTENT */}
        <textarea 
        placeholder='Blog Description'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
         />

         {/* Category Dropdown */}
         <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
           <option value="Technology">Technology</option>
          <option value="Travel">Travel</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Food">Food</option>
          <option value="Education">Education</option>
          <option value="Health & Fitness">Health & Fitness</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Science">Science</option>
         </select>

          <div className="form-btns">
          <button type='submit'>Edit</button>
          <button type="button" onClick={() => handleDelete(id)} className='btn-delete'>Delete ✖</button>
          </div>
      </form>
    </div>
  )
}

export default EditPost
