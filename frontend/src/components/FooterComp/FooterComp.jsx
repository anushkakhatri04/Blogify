import React from 'react';
import './FooterComp.css';

const FooterComp = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-about">
          <h2>Blogify</h2>
          <p>Your space to share thoughts, ideas, and stories with the world.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><i className="fa-brands fa-facebook"></i></a>
            <a href="#"><i className="fa-brands fa-twitter"></i></a>
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-linkedin"></i></a>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="footer-newsletter">
          <h3>Subscribe</h3>
          <p>Get the latest posts directly in your inbox</p>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        © 2025 Blogify. All Rights Reserved.
      </div>
    </footer>
  );
};

export default FooterComp;
