import React, { useState } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets';
import './AddPost.css'
import { useNavigate } from "react-router-dom"


const AddPost = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

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

      await axios.post("https://blogify-backend-wz2i.onrender.com/api/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
      });
      alert("Post published successfully!");
      navigate("/")
      setTitle(""); setContent(""); setCategory(""); setThumbnail(null); setPreview(null);
    } catch (error) {
       console.error(error);
      alert("Failed to publish post.");
    }
  };

  return (
    <div className='add-post-page'>
      <h1>Add New Blog</h1>

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

         <button type='submit'>Publish</button>
      </form>
    </div>
  )
}

export default AddPost
