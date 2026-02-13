import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import ChangeBackground from "../components/ChangeBackground";
import "../styles/Journey.css";

const API = "http://localhost:8080";

export default function NewPageJournalHeavy() {
  const navigate = useNavigate();
  const { id } = useParams(); // if present => editing existing note
  const [searchParams] = useSearchParams();
  const dateFromQuery = searchParams.get("date"); // when creating new note

  const [token, setToken] = useState("");
  const [isLight, setIsLight] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState(dateFromQuery || new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);

  // ✅ always fetch token from the same key
  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) {
      navigate("/"); // go login
      return;
    }
    setToken(t);
  }, [navigate]);

  // ✅ if editing existing note, load it
  useEffect(() => {
    if (!token) return;
    if (!id) return;

    setLoading(true);
    axios
      .get(`${API}/journal/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      })
      .then((res) => {
        const n = res.data || {};
        setTitle(n.title || "");
        setBody(n.body || "");
        setDate(n.date || dateFromQuery || new Date().toISOString().slice(0, 10));
      })
      .catch((err) => {
        console.error("❌ Load note failed:", err.response?.data || err.message);
      })
      .finally(() => setLoading(false));
  }, [token, id, dateFromQuery]);

  const handleSave = async () => {
    const t = localStorage.getItem("token");
    if (!t) {
      alert("Please log in first");
      navigate("/");
      return;
    }

    try {
      setLoading(true);

      // if id exists -> update, else create
      if (id) {
        await axios.put(
          `${API}/journal/notes/${id}`,
          { title, body, date, type: "heavy" },
          {
            headers: {
              Authorization: `Bearer ${t}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
      } else {
        const created = await axios.post(
          `${API}/journal/notes`,
          { title, body, date, type: "heavy" },
          {
            headers: {
              Authorization: `Bearer ${t}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        // ✅ redirect to the created note page (so refresh works)
        const newId = created.data?.id;
        if (newId) navigate(`/JourneyHeavy/${newId}`);
      }

      // optional: go back to list after save
      // navigate("/JourneyHeavy");

    } catch (err) {
      console.error("❌ Save failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="homepage">
      <NavBar />

      <div className="journal-page" style={{ paddingTop: 12 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
          <button
            onClick={() => navigate("/JourneyHeavy")}
            className="pixel-btn"
            style={{ width: "fit-content" }}
          >
            ← Back
          </button>

          <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 12 }}>
            Heavy Note • {date}
          </div>
        </div>

        <input
          className={`journal-entry ${isLight ? "light" : "dark"}`}
          style={{ minHeight: 44, marginBottom: 10 }}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className={`journal-entry ${isLight ? "light" : "dark"}`}
          placeholder="Write your heavy thoughts here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={18}
        />

        <div className="pixel-action-bar">
          <ChangeBackground toggleColor={() => setIsLight((p) => !p)} isLight={isLight} />

          <button onClick={handleSave} className="pixel-btn save-btn" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

        {loading && <div style={{ marginTop: 10, fontFamily: "VT323, monospace" }}>Loading…</div>}
      </div>
    </div>
  );
}
