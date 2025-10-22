import React, { useEffect, useRef, useState } from 'react';
import "../styles/Journey.css";
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ChangeBackground from '../components/ChangeBackground';
import axios from 'axios';


const API = "http://localhost:8080";

export default function NewPageJournalHeavy() {
  const { id } = useParams(); // present on /JourneyHeavy/:id
  const isNew = !id;
  const navigate = useNavigate();
  const loc = useLocation();
  const qp = new URLSearchParams(loc.search);

  const token = localStorage.getItem("jwtToken");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState(qp.get("date") || new Date().toISOString().slice(0, 10));
  const [isLight, setIsLight] = useState(false);
  const [saving, setSaving] = useState(false);

  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  // EDIT mode: load existing note
  useEffect(() => {
    if (isNew || !token) return;
    axios.get(`${API}/journal/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
    })
      .then(r => {
        setTitle(r.data.title || "");
        setBody(r.data.body || "");
        setDate(r.data.date || date);
      })
      .catch(e => {
        console.error("Load failed:", e.response?.data || e.message);
        alert("Could not load the note");
        navigate("/JourneyHeavy");
      });
  }, [isNew, id, token]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleTextareaBackground = () => setIsLight(v => !v);

  const handleSave = async () => {
    if (!token) { alert("Please log in first."); return; }
    setSaving(true);

    const payload = {
      title: (title || body.split("\n")[0].slice(0, 60)),
      body,
      date,
      type: "heavy"
    };

    try {
      if (isNew) {
        await axios.post(`${API}/journal/notes`, payload, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });
      } else {
        await axios.put(`${API}/journal/notes/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });
      }
      navigate("/JourneyHeavy");
    } catch (err) {
      console.error("❌ Save failed:", err.response?.data || err.message);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="homepage">
      <NavBar />

      <div className="top-banner">
        <div className="banner-row">
          <NavLink to="/JourneyHeavy" className="back-btn">
            <img src="/icons/backButton.png" alt="Back" />
          </NavLink>

          <h1 className="banner-title">
            Journey
            <img src="/icons/powerpuff1.png" alt="logo" className='powerpuff' />
            <img src="/icons/powerpuff2.png" alt="pixel logo" className="powerpuff" />
            <img src="/icons/powerpuff3.png" alt="pixel logo" className="powerpuff" />
          </h1>
        </div>


        <div className="nav-links2">
          <NavLink to="/journey" className="inactive-tab">Rules</NavLink>
          <NavLink to="/JourneyHeavy" className="active-tab">Heavy</NavLink>
          <NavLink to="/JourneyLight" className="inactive-tab">Light</NavLink>
        </div>
      </div>



      <form onSubmit={(e) => e.preventDefault()} style={{ marginTop: '2rem' ,maxWidth:"980px",marginLeft:"13.6rem"}}>
        <div style={{ display: "flex", gap: "29rem" }}>
          <input
            ref={inputRef}
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="journal-title-input"
            placeholder="Title…"
          />

          <div style={{ display: "flex", gap: '1.3rem',marginBottom:"1%" }}>
            <img style={{ width: '70px', height: '70px' }} src="/public/icons/text.jpeg" alt="icon1" />
            <img style={{ width: '70px', height: '70px' }} src="/public/icons/text.jpeg" alt="icon2" />
            <img style={{ width: '70px', height: '70px' }} src="/public/icons/text.jpeg" alt="icon3" />
          </div>
        </div>

        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          className="journal-entry"
          placeholder="Write your thoughts..."
          rows={16}
          style={{
            backgroundColor: isLight ? "#fff8dc" : "#A8E6CF",
            borderColor: isLight ? "#FEEB75" : "#333"
          }}
        />

        <div className="pixel-action-bar">
          <ChangeBackground toggleColor={() => setIsLight(prev => !prev)} isLight={isLight} />
          <button onClick={handleSave} className="pixel-btn save-btn">
            Save
          </button>
        </div>
      </form>

    </div>
  );
}
