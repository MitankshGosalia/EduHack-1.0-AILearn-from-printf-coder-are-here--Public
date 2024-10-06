import React from "react";
import { Link } from "react-router-dom";
import './Home.css';  // For styling the landing page

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to AI-Learn</h1>
      <p>Leverage AI to enhance your learning experience with real-time feedback and personalized assessments.</p>
      <Link to="/register" className="btn-primary">Join Us</Link>
    </div>
  );
};

export default Home;
