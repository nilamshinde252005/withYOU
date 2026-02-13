import { Link } from "react-router-dom";
import React from 'react';
import "../styles/Home.css";

function FeatureGrid({ title, description, buttonText, icon,link }) {
  return (
    <div className="feature-grid">
      <div className="feature-card">
        <div className="feature-title">
          {icon && <img src={icon} className="logo-icon2" alt="icon" />}
          <h3>{title}</h3>
        </div>
        <p style={{ paddingLeft: "3%" }}>{description}</p>
        <Link to={link}>
          <button style={{ marginLeft: "3%", fontWeight: "bold" }}>
            {buttonText}
          </button>
        </Link>      </div>
    </div>
  );
}

export default FeatureGrid;
