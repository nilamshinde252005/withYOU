import React from "react";
import NavBar from "../components/NavBar";
import "../styles/MagicHome.css";
import { NavLink } from "react-router-dom";

const pixelStar = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' shape-rendering='crispEdges'><rect x='3' y='0' width='4' height='2' fill='%23FFD166'/><rect x='2' y='2' width='4' height='4' fill='%23FFD166'/><rect x='1' y='3' width='6' height='1' fill='%23FFD166'/><rect x='2' y='4' width='4' height='1' fill='%23FFD166'/></svg>";
const pixelHeart = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' shape-rendering='crispEdges'><rect x='1' y='2' width='2' height='2' fill='%23FF6B6B'/><rect x='5' y='2' width='2' height='2' fill='%23FF6B6B'/><rect x='2' y='3' width='7' height='6' fill='%23FF6B6B'/></svg>";
const pixelSparkle = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' shape-rendering='crispEdges'><rect x='3' y='0' width='2' height='2' fill='%23C7A8F2'/><rect x='0' y='3' width='2' height='2' fill='%23C7A8F2'/><rect x='6' y='3' width='5' height='5' fill='%23C7A8F2'/><rect x='3' y='6' width='2' height='2' fill='%23C7A8F2'/></svg>";
const pixelLeaf = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' shape-rendering='crispEdges'><rect x='4' y='0' width='1' height='2' fill='%2300A86B'/><rect x='3' y='1' width='3' height='1' fill='%2300A86B'/><rect x='2' y='2' width='6' height='3' fill='%2300A86B'/><rect x='1' y='3' width='6' height='1' fill='%2300A86B'/><rect x='2' y='4' width='4' height='1' fill='%2300A86B'/></svg>";
const pixelBook = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' shape-rendering='crispEdges'><rect x='0' y='1' width='6' height='5' fill='%23FFD8A8'/><rect x='1' y='2' width='4' height='3' fill='%23FFFFFF'/><rect x='6' y='1' width='2' height='7' fill='%238C6A3B'/></svg>";
const pixelSun = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' shape-rendering='crispEdges'><rect x='3' y='2' width='2' height='2' fill='%23FFD166'/><rect x='3' y='0' width='2' height='1' fill='%23FFD166'/><rect x='0' y='3' width='4' height='7' fill='%23FFD166'/><rect x='7' y='3' width='1' height='2' fill='%23FFD166'/><rect x='3' y='6' width='2' height='1' fill='%23FFD166'/></svg>";
const pixelBolt = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' shape-rendering='crispEdges'><rect x='3' y='0' width='2' height='2' fill='%23FFCC00'/><rect x='2' y='2' width='3' height='1' fill='%23FFCC00'/><rect x='3' y='3' width='5' height='5' fill='%23FFCC00'/><rect x='2' y='5' width='2' height='1' fill='%23FFCC00'/></svg>";
const pixelMoon = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' shape-rendering='crispEdges'><rect x='2' y='1' width='4' height='6' fill='%23D6E0FF'/><rect x='3' y='1' width='3' height='1' fill='rgba(0,0,0,0.06)'/><rect x='3' y='2' width='6' height='4' fill='rgba(0,0,0,0.06)'/></svg>";
const pixelCheck = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' shape-rendering='crispEdges'><rect x='1' y='3' width='2' height='1' fill='%2300A86B'/><rect x='3' y='4' width='3' height='1' fill='%2300A86B'/><rect x='5' y='2' width='3' height='3' fill='%2300A86B'/></svg>";

function MagicHome() {
    return (
        <div className="homepage">
            <NavBar />

            <div className="magic-nav">
                <NavLink to="/MagicHome" className={({ isActive }) => isActive ? "active-tab" : "inactive-tab"}>
                    <span className="nav-icon">
                        <img src={pixelStar} alt="" className="pixel-icon" />
                        Overview
                    </span>
                </NavLink>

                <NavLink to="/MagicDay" className="inactive-tab">
                    <span className="nav-icon">
                        <img src={pixelHeart} alt="" className="pixel-icon" />
                        Magic -28 Days
                    </span>
                </NavLink>

                <NavLink to="/ProgressTracker" className="inactive-tab">
                    <span className="nav-icon">
                        <img src={pixelSparkle} alt="" className="pixel-icon" />
                        Progress: Tracker
                    </span>
                </NavLink>
            </div>

            <div className="content">
                <div className="image-container">
                    <img
                        src="/icons/sunflower.jpg"
                        alt="The Magic Book"
                        className="home-img"
                    />

                    <div className="overlay">
                        <div className="overlay-text">
                            <h3>
                              <img src={pixelBolt} alt="" className="pixel-icon inline-badge" />
                              The 28-Day Gratitude Challenge
                            </h3>
                            <p>
                                <img src={pixelLeaf} alt="" className="pixel-icon" style={{ width: 20, height:20, verticalAlign: 'middle', marginRight:6 }} />
                                The Magic isn’t just a book — it’s a 28-day journey. Each day
                                gives you a new gratitude practice, from writing blessings to
                                holding a gratitude rock, designed to rewire your mindset and
                                transform your daily life.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text">
                    <h2>
                        <img src={pixelBook} alt="" className="pixel-icon pixel-badge inline-badge" />
                        What is <i>The Magic</i> by Rhonda Byrne about?
                    </h2>

                    <p className="text2">
                        <img src={pixelCheck} alt="" className="pixel-icon" style={{ width:18, height:18, verticalAlign:'middle', marginRight:8 }} />
                        <i>The Magic</i> is a self-help book that teaches how to use
                        gratitude as a powerful tool to transform your life in just 28 days.
                        Through daily practices such as listing blessings, using a gratitude
                        rock, and revisiting positive moments, Rhonda Byrne shows how
                        cultivating thankfulness can unlock abundance, shift your mindset,
                        and create real-life changes. Readers often describe it as both
                        enchanting and practical, blending a magical reading experience with
                        life-changing lessons that encourage consistency, mindfulness, and
                        intentional living.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MagicHome;
