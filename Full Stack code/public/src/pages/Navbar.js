// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Add a CSS file for styling the navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">AI-Learn</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/features">Features</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register" className="btn-primary">Join Us</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
