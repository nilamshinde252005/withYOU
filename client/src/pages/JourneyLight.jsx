import React, { useEffect, useState } from "react";
import "../styles/Journey.css";
import { NavLink, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../styles/ListJournalHeavy.css";
import { api } from "../lib/api";

export default function JourneyLight() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ USE SAME KEY AS api.js (token)
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    api
      .get("/journal/notes", { params: { type: "light" } })
      .then((r) => setNotes(r.data || []))
      .catch((e) => {
        console.error("List failed:", e.response?.data || e.message);

        if (e.response?.status === 403 || e.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        }
      });
  }, [navigate]);

  const newPage = () => {
    const today = new Date().toISOString().slice(0, 10);
    navigate(`/JourneyLight/new?date=${today}`);
  };

  const formatDate = (iso) => {
    const d = iso ? new Date(iso) : new Date();
    const wd = d.toLocaleDateString(undefined, { weekday: "short" });
    const day = d.toLocaleDateString(undefined, { day: "numeric" });
    return `${wd} ${day}`;
  };

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
          <NavLink
            to="/journey"
            className={({ isActive }) => (isActive ? "active-tab" : "inactive-tab")}
          >
            Rules
          </NavLink>
          <NavLink
            to="/JourneyHeavy"
            className={({ isActive }) => (isActive ? "active-tab" : "inactive-tab")}
          >
            Heavy
          </NavLink>
          <NavLink
            to="/JourneyLight"
            className={({ isActive }) => (isActive ? "active-tab" : "inactive-tab")}
          >
            Light
          </NavLink>
        </nav>
      </header>

      <main className="list-wrap">
        <div className="list-header">
          <h2 className="month-heading">
            {new Date().toLocaleDateString(undefined, { month: "long", year: "numeric" })}
          </h2>
          <button onClick={newPage} className="icon-button" title="New page">
            <img src="/icons/newpage.png" alt="new page" className="newpage-icon" />
          </button>
        </div>

        {notes.length === 0 && <div className="empty-row">No notes yet — click the notepad.</div>}

        <div className="notes-grid">
          {notes.map((n) => (
            <NavLink key={n.id} to={`/JourneyLight/${n.id}`} className="note-row">
              <span className="note-date">{formatDate(n.date || n.updatedAt)}</span>
              <span className="note-title">{n.title || "Untitled"}</span>
              <img src="/icons/lightList.png" alt="icon" className="note-star" />
            </NavLink>
          ))}
        </div>
      </main>
    </div>
  );
}
