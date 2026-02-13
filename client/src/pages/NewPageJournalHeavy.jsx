import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import ChangeBackground from "../components/ChangeBackground";
import "../styles/Journey.css";
import { api, getToken } from "../lib/api";

export default function NewPageJournalHeavy() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const dateFromQuery = searchParams.get("date");

  const [isLight, setIsLight] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState(dateFromQuery || new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = getToken();
    if (!t) navigate("/");
  }, [navigate]);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    if (!id) return;

    setLoading(true);
    api
      .get(`/journal/notes/${id}`)
      .then((res) => {
        const n = res.data || {};
        setTitle(n.title || "");
        setBody(n.body || "");
        setDate(n.date || dateFromQuery || new Date().toISOString().slice(0, 10));
      })
      .catch((err) => console.error(" Load note failed:", err.response?.data || err.message))
      .finally(() => setLoading(false));
  }, [id, dateFromQuery]);

  const handleSave = async () => {
    const token = getToken();
    if (!token) {
      alert("Please log in first");
      navigate("/");
      return;
    }

    try {
      setLoading(true);

      if (id) {
        await api.put(`/journal/notes/${id}`, { title, body, date, type: "heavy" });
      } else {
        const created = await api.post(`/journal/notes`, { title, body, date, type: "heavy" });
        const newId = created.data?.id;
        if (newId) navigate(`/JourneyHeavy/${newId}`);
      }
    } catch (err) {
      console.error(" Save failed:", err.response?.data || err.message);
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
          <button onClick={() => navigate("/JourneyHeavy")} className="pixel-btn" style={{ width: "fit-content" }}>
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
