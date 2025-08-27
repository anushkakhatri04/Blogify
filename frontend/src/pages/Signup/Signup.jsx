import React, { useState } from 'react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Signup = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const res = await axios.post("http://localhost:8080/api/users/register", {
        username,
        email,
        password
    })

    //save token and user information
    localStorage.setItem("user", JSON.stringify(res.data))

    navigate("/dashboard")

    } catch(err) {
      setError(err.response?.data?.message || "Signup failed")
    }

  }

  return (
    <div className='signup-container'>
      <div className="signup-card">
        <div className="signup-heading">
          <div className="h2-create"><h2>Create</h2></div>
          <div className="h2-account"><h2>Account</h2></div>
        </div>
        <p>Sign up to access your personal dashboard and start blogging today.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>Username</label>
          <input 
          type="username" 
          placeholder='Enter username' 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          required
          />
          <label htmlFor='email'>Email</label>
          <input 
          type='email' 
          placeholder='Enter your email' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
          <label htmlFor='password'>Password</label>
          <input 
          type="password"
          placeholder='Type your password'
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required
          />
          <button>SignUp</button>
          <p>Have an account? <Link to="/login">Login</Link></p>
        </form>
        {error && <p className='error'>{error}</p>}
      </div>
    </div>
  )
}

export default Signup
