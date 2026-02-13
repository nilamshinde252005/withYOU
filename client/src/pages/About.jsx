// src/pages/About.jsx
import React from "react";
import "../styles/About.css";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";

export default function About() {
  return (
    <div className="homepage">
      <NavBar />

      <header className="top-banner">
        <div className="banner-row">
          
          <h1 className="banner-title">
            About
            <img src="/icons/powerpuff1.png" alt="logo" className="powerpuff" />
            <img src="/icons/powerpuff2.png" alt="pixel logo" className="powerpuff" />
            <img src="/icons/powerpuff3.png" alt="pixel logo" className="powerpuff" />
          </h1>
        </div>
      </header>

      <main className="about-wrap">
        <section className="about-intro">
          <h2>Welcome to withYOU ✨</h2>
          <p>
            <strong>withYOU</strong> is your cozy, pixel-style space for journaling,
            gratitude, and gentle productivity. It combines reflection, to-do tracking,
            and a 28-day “Magic” gratitude journey into one calm, creative hub.
          </p>
        </section>

        <section className="about-section">
          <h3>🌸 What You Can Do Here</h3>
          <ul>
            <li><strong>Journey → Rules</strong> — Write your personal life guidelines or goals.</li>
            <li><strong>Journey → Heavy</strong> — Deep journaling space for long reflections.</li>
            <li><strong>Journey → Light</strong> — Quick thoughts, wins, and short notes.</li>
            <li><strong>Magic – 28 Days</strong> — Daily gratitude checklist inspired by *The Magic* book.</li>
            <li><strong>Progress: Tracker</strong> — Shows how many “Magic” days you’ve finished.</li>
            <li><strong>Tasks</strong> — Simple to-do list for your main daily actions.</li>
            <li><strong>Vision Board</strong> — Add visuals, goals, or inspiration images.</li>
            <li><strong>Books</strong> — Space to log your reads and thoughts.</li>
            <li><strong>Reset</strong> — Clear cache, change theme, or fix small glitches.</li>
          </ul>
        </section>

        <section className="about-section">
          <h3>💡 How To Use It</h3>
          <ol>
            <li>Register or log in to create your space.</li>
            <li>Set your <strong>Rules</strong> (your mini life manual).</li>
            <li>Write in <strong>Heavy</strong> or <strong>Light</strong> journals whenever you want.</li>
            <li>Complete one <strong>Magic</strong> task a day and tick it off in the tracker.</li>
            <li>Plan your day with <strong>Tasks</strong> and check progress often.</li>
            <li>Keep your vibes high with your <strong>Vision Board</strong>.</li>
          </ol>
        </section>

        <section className="about-section">
          <h3>🔒 Saving & Privacy</h3>
          <p>
            - You sign in with a secure JWT token stored in your browser.<br/>
            - Journals, rules, and tasks are linked to your account and saved through the API.<br/>
            - Some quick-access preferences (like Magic checklist) are kept locally so you can switch tabs without losing progress.<br/>
            - Current version uses a simulated in-memory database (resets if server restarts). It can easily upgrade to a real database later.
          </p>
        </section>

        <section className="about-section">
          <h3>💭 The Idea Behind withYOU</h3>
          <p>
            <strong>withYOU</strong> was built for creators, students, and anyone who wants
            a peaceful online corner. It’s designed to feel like a digital diary café —
            pixel aesthetics, soft colors, and tiny wins that make consistency fun.
          </p>
        </section>

        <section className="about-section">
          <h3>🌼 Quick Tips</h3>
          <ul>
            <li>Write one Heavy and one Light entry each week.</li>
            <li>Do one Magic practice daily — five minutes is enough.</li>
            <li>Keep your Rules short and re-read them every morning.</li>
            <li>Limit yourself to three Tasks per day for clarity.</li>
          </ul>
        </section>

        <section className="about-section">
          <h3>🧡 Credits & Vibe</h3>
          <p>
            Made with love, caffeine, and pixels for anyone balancing self-care and productivity.  
            The goal: make reflection feel soft, creative, and something you look forward to.
          </p>
        </section>

        <footer className="about-footer">
          <p>© 2025 withYOU — built with React, Node, and imagination ✨</p>
        </footer>
      </main>
    </div>
  );
}
