import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useEffect, useState } from 'react'

const Navbar = () => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if(storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav>
      <Link to="/"><img src={assets.logo} alt="Logo" /></Link>
      <div className='nav-menu'>
        <ul>
          <li><Link className='link' to="/">Home</Link></li>
          <li><Link className='link' to="/about">About</Link></li>
          <li><Link className='link' to="/contact">Contact</Link></li>
        </ul>
        {user ? (
          location.pathname === "/dashboard" ? (
            <button onClick={handleLogout} className='btn'>Logout<i className="fa-solid fa-arrow-right-long"></i></button>
          ) : (
            <Link to="/dashboard"><button className='btn'>Dashboard<i className="fa-solid fa-arrow-right-long"></i></button></Link>
          )
        ) : (
          <Link to="/login"><button className='btn'>Login<i className="fa-solid fa-arrow-right-long"></i></button></Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
