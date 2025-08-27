import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://blogify-backend-wz2i.onrender.com/api/users/login", { email, password });

      //save token and user info
      localStorage.setItem("user", JSON.stringify({...res.data.user, token: res.data.token}));

      navigate("/dashboard");

    } catch (err){
      setError(err.response?.data?.message || "Login failed")
    }
  };


  return (
    <div className='login-container'>
      <div className="login-card">
        <div className='login-heading'><h2 className='h2-dashboard'>Dashboard</h2><h2 className='h2-login'>Login</h2></div>
        <p>Enter your credentials to access the dashboard</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input 
          type="email" 
          placeholder='Enter your email' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
          <label htmlFor='password'>Password</label>
          <input 
          type="passsword" 
          placeholder='Enter your password' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
          <button>Login</button>
          <p>New here? <Link to="/signup">Create an account</Link></p>
        </form>
        {error && <p className='error'>{error}</p>}
      </div>
    </div>
  )
}

export default Login
