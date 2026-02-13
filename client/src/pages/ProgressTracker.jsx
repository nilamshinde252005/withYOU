// src/pages/MagicHome.jsx
import React, { useEffect, useMemo, useState } from "react";
import "../styles/MagicHome.css";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";

// tiny helpers
function safeDecodeJwtUsername(token) {
  try {
    if (!token) return "anon";
    const payload = JSON.parse(atob(token.split(".")[1] || ""));
    return payload?.name || "anon";
  } catch {
    return "anon";
  }
}

const pixelStar =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' shape-rendering='crispEdges'><rect x='3' y='0' width='4' height='2' fill='%23FFD166'/><rect x='2' y='2' width='4' height='4' fill='%23FFD166'/><rect x='1' y='3' width='6' height='1' fill='%23FFD166'/><rect x='2' y='4' width='4' height='1' fill='%23FFD166'/></svg>";
const pixelHeart =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' shape-rendering='crispEdges'><rect x='1' y='2' width='2' height='2' fill='%23FF6B6B'/><rect x='5' y='2' width='2' height='2' fill='%23FF6B6B'/><rect x='2' y='3' width='7' height='6' fill='%23FF6B6B'/></svg>";
const pixelSparkle =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' shape-rendering='crispEdges'><rect x='3' y='0' width='2' height='2' fill='%23C7A8F2'/><rect x='0' y='3' width='2' height='2' fill='%23C7A8F2'/><rect x='6' y='3' width='5' height='5' fill='%23C7A8F2'/><rect x='3' y='6' width='2' height='2' fill='%23C7A8F2'/></svg>";

export default function TaskTracker() {
  // the 28 tasks (order matters for saved state)
  const tasks = useMemo(
    () => [
      "Count Your Blessings",
      "The Magic Rock",
      "Magical Relationships",
      "Magical Health",
      "Magic Money",
      "Works Like Magic",
      "The Magical Way Out of Negativity",
      "The Magic Ingredient",
      "The Money Magnet",
      "Magic Dust Everyone",
      "A Magical Morning",
      "Magical People Who Made a Difference",
      "Make All Your Wishes Come True",
      "Have a Magical Day",
      "Magically Heal Your Relationships",
      "Magic and Miracles in Health",
      "The Magic Check",
      "The Magical To-Do List",
      "Magic Footsteps",
      "Heart Magic",
      "Magnificent Outcomes",
      "Before Your Very Eyes",
      "The Magical Air That You Breathe",
      "The Magic Wand",
      "Cue the Magic",
      "Magically Transform Mistakes into Blessings",
      "The Magic Mirror",
      "Remember the Magic",
    ],
    []
  );

  // per-user storage key
  const token = localStorage.getItem("jwtToken");
  const username = safeDecodeJwtUsername(token);
  const STORAGE_KEY = `magicProgress:${username}`;

  // initial load (from localStorage)
  const [checked, setChecked] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const saved = raw ? JSON.parse(raw) : null;
      if (Array.isArray(saved)) {
        // normalize length in case tasks changed
        const fixed = Array(tasks.length).fill(false);
        saved.slice(0, tasks.length).forEach((v, i) => (fixed[i] = !!v));
        return fixed;
      }
    } catch {}
    return Array(tasks.length).fill(false);
  });

  // if username changes (login/logout), reload that user's saved progress
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const saved = raw ? JSON.parse(raw) : null;
      if (Array.isArray(saved)) {
        const fixed = Array(tasks.length).fill(false);
        saved.slice(0, tasks.length).forEach((v, i) => (fixed[i] = !!v));
        setChecked(fixed);
      } else {
        setChecked(Array(tasks.length).fill(false));
      }
    } catch {
      setChecked(Array(tasks.length).fill(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [STORAGE_KEY]); // depends on username

  // persist on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked, STORAGE_KEY]);

  const toggle = (index) => {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const markAll = () => setChecked(Array(tasks.length).fill(true));
  const resetAll = () => setChecked(Array(tasks.length).fill(false));

  const completed = checked.filter(Boolean).length;
  const percent = Math.round((completed / tasks.length) * 100);

  return (
    <div className="homepage">
      <NavBar />

      <div className="magic-nav">
        <NavLink to="/MagicHome" className="inactive-tab">
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

        <NavLink
          to="/ProgressTracker"
          className={({ isActive }) => (isActive ? "active-tab" : "inactive-tab")}
        >
          <span className="nav-icon">
            <img src={pixelSparkle} alt="" className="pixel-icon" />
            Progress: Tracker
          </span>
        </NavLink>
      </div>

      <main className="tracker-wrap">
        {/* Left pixel panel */}
        <aside className="tracker-left">
          <div className="pixel-banner">
            <img src="/images/manifesting1.jpeg" alt="magic banner" className="pixel-img" />
            <div className="pixel-deco">
              {/* public assets are served from root, NOT /public/... */}
              <img src="/decor/bunny.png" alt="icon" className="mini-icon" />
              <img src="/icons/flower.png" alt="icon" className="mini-icon" />
            </div>
          </div>

          <div className="pixel-card">
            <h4>Magic Progress</h4>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className="progress-fill" style={{ width: `${percent}%` }} />
            </div>
            <div className="progress-stats">
              <strong>{percent}%</strong>
              <span>
                {completed} / {tasks.length}
              </span>
            </div>

            <div className="pixel-legend">
              <div className="legend-item">
                <span className="pixel-square done" /> Done
              </div>
              <div className="legend-item">
                <span className="pixel-square todo" /> To do
              </div>
            </div>

            <button className="pixel-btn" onClick={markAll}>
              Mark all complete
            </button>
            <button className="pixel-btn ghost" onClick={resetAll}>
              Reset
            </button>
          </div>
        </aside>

        {/* Right: task list */}
        <section className="tracker-right">
          <h3 className="tracker-title">Magic Book Checklist</h3>
          <p className="tracker-sub">Tick a day when you completed its practice ✨</p>

          <ul className="task-grid">
            {tasks.map((task, i) => (
              <li key={i} className={`task-tile ${checked[i] ? "tile-done" : ""}`}>
                <label className="tile-label">
                  <input
                    type="checkbox"
                    checked={checked[i]}
                    onChange={() => toggle(i)}
                    className="tile-checkbox"
                  />
                  <div className="tile-content">
                    <div className="tile-title">
                      <span className="pixel-icon" aria-hidden="true">
                        🪄
                      </span>
                      <span>{task}</span>
                    </div>
                    <div className="tile-sub">Day {i + 1}</div>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
