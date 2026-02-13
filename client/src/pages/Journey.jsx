import React from 'react';
import "../styles/Journey.css";
import Journal from '../components/Journal';
import { NavLink } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SoundTest from '../components/SoundTest';

function Journey() {
  return (
    <div className="homepage">
      <NavBar />

      <header className="top-banner">
        <div className="Topbanner">
          <h1 className="banner-title">
            Journey
            <img src="/icons/powerpuff1.png" alt="logo" className="powerpuff" />
            <img src="/icons/powerpuff2.png" alt="pixel logo" className="powerpuff" />
            <img src="/icons/powerpuff3.png" alt="pixel logo" className="powerpuff" />
          </h1>
        </div>

        <nav className="nav-links2" aria-label="journey navigation">
          <NavLink to="/journey" className={({ isActive }) => (isActive ? "active-tab" : "")}>
            Rules
          </NavLink>
          <NavLink to="/JourneyHeavy" className={({ isActive }) => (isActive ? "active-tab" : "inactive-tab")}>
            Heavy
          </NavLink>
          <NavLink to="/JourneyLight" className={({ isActive }) => (isActive ? "active-tab" : "inactive-tab")}>
            Light
          </NavLink>
        </nav>
      </header>

      <main className="journal-container">
        <Journal />
      </main>

      <div style={{ maxWidth: 1100, margin: "26px auto", padding: "0 16px", boxSizing: "border-box" }}>
        <div
          style={{
            display: "flex",
            gap: 28,
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",     // stacks on small screens
          }}
        >
          {/* left: title + subtitle */}
          <div style={{ flex: "1 1 480px", minWidth: 260 }}>
            <h1
              style={{
                fontFamily: '"VT323", monospace',
                fontSize: "2.2rem",
                margin: "0 0 6px 0",
                color: "#4a2c2a",
                letterSpacing: 1,
                textShadow: "2px 2px 0 #b57edc",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span>idk bro — go to therapy</span>
              <img
                src="/decor/dog.jpg"
                alt=""
                style={{ width: 110, height: 116, imageRendering: "pixelated", borderRadius: 4 }}
              />
            </h1>
      
            <p
              style={{
                margin: 0,
                marginTop: 6,
                fontFamily: '"VT323", monospace',
                color: "#26472a",
                fontSize: "1.05rem",
                textShadow: "1px 1px 0 #6fbf73",
                opacity: 0.95,
                lineHeight: 1.4,
              }}
            >
              a cozy space to journal, manifest & play
              <span style={{ marginLeft: 8, color: "#6b6b6b", fontStyle: "italic", fontSize: "0.95rem" }}>
                — gentle prompts, tiny rituals & soft pixels.
              </span>
            </p>
          </div>
      
      
          <div
            style={{
              flex: "0 0 320px",
              minWidth: 240,
              marginTop: 8,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              
            >
              <SoundTest />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Journey;
