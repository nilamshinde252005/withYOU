import React, { useEffect, useState } from "react";
import "../styles/MagicHome.css";
import NavBar from "../components/NavBar";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import magicDays from "../data/magicDays";
import { api } from "../lib/api";

const pixelStar =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' shape-rendering='crispEdges'><rect x='3' y='0' width='4' height='2' fill='%23FFD166'/><rect x='2' y='2' width='4' height='4' fill='%23FFD166'/><rect x='1' y='3' width='6' height='1' fill='%23FFD166'/><rect x='2' y='4' width='4' height='1' fill='%23FFD166'/></svg>";
const pixelHeart =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' shape-rendering='crispEdges'><rect x='1' y='2' width='2' height='2' fill='%23FF6B6B'/><rect x='5' y='2' width='2' height='2' fill='%23FF6B6B'/><rect x='2' y='3' width='7' height='6' fill='%23FF6B6B'/></svg>";
const pixelSparkle =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' shape-rendering='crispEdges'><rect x='3' y='0' width='2' height='2' fill='%23C7A8F2'/><rect x='0' y='3' width='2' height='2' fill='%23C7A8F2'/><rect x='6' y='3' width='5' height='5' fill='%23C7A8F2'/><rect x='3' y='6' width='2' height='2' fill='%23C7A8F2'/></svg>";

const allDays = [
  { day: 1, title: "Count Your Blessings", src: "/images/manifesting1.jpeg" },
  { day: 2, title: "Magic Rock", src: "/images/manifesting2.jpeg" },
  { day: 3, title: "Magical Relationships", src: "/images/manifesting3.jpeg" },
  { day: 4, title: "Magical Health", src: "/images/mani4.jpeg" },
  { day: 5, title: "Magic Money", src: "/images/mani5.jpeg" },
  { day: 6, title: "Works Like Magic", src: "/images/mani6.jpeg" },
  { day: 7, title: "Quiet the Noise", src: "/images/mani5.jpeg" },
  { day: 8, title: "Small Brave Acts", src: "/images/mani6.jpeg" },
  { day: 9, title: "Creative Permission", src: "/images/mani4.jpeg" },
  { day: 10, title: "Home as Sanctuary", src: "/images/manifesting1.jpeg" },
  { day: 11, title: "Ritual Breakfast", src: "/images/manifesting2.jpeg" },
  { day: 12, title: "Boundaries That Bloom", src: "/images/manifesting3.jpeg" },
  { day: 13, title: "Mindful Consumption", src: "/images/mani4.jpeg" },
  { day: 14, title: "Pocket of Joy", src: "/images/mani5.jpeg" },
  { day: 15, title: "Deep Work Window", src: "/images/mani6.jpeg" },
  { day: 16, title: "Letters of Compassion", src: "/images/mani4.jpeg" },
  { day: 17, title: "Nature Reboot", src: "/images/mani5.jpeg" },
  { day: 18, title: "Micro-Declutter", src: "/images/mani6.jpeg" },
  { day: 19, title: "Gratitude Walk", src: "/images/mani4.jpeg" },
  { day: 20, title: "Gratitude Letter", src: "/images/mani5.jpeg" },
  { day: 21, title: "Breathing Blessings", src: "/images/mani6.jpeg" },
  { day: 22, title: "Mirror Thanks", src: "/images/manifesting1.jpeg" },
  { day: 23, title: "Tiny Rituals", src: "/images/manifesting2.jpeg" },
  { day: 24, title: "Grateful Meal", src: "/images/manifesting3.jpeg" },
  { day: 25, title: "Gratitude Collage", src: "/images/mani4.jpeg" },
  { day: 26, title: "Memory Replay", src: "/images/mani5.jpeg" },
  { day: 27, title: "Grateful Sleep", src: "/images/mani6.jpeg" },
  { day: 28, title: "The Final Blessing", src: "/images/manifesting1.jpeg" },
];

function MagicDay() {
  const { day } = useParams();
  const dayNumber = day ? parseInt(day, 10) : null;
  const current = dayNumber ? magicDays.find((d) => d.day === dayNumber) : null;
  const navigate = useNavigate();

  const [entries, setEntries] = useState({});

  // if no token -> login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  const fetchEntry = async (d) => {
    if (!d) return;
    try {
      const res = await api.get(`/magic/entries/${d}`);
      setEntries((prev) => ({
        ...prev,
        [d]: { text: res.data.text || "", updatedAt: res.data.updatedAt || null },
      }));
    } catch (err) {
      console.error("Error fetching entry:", err.response?.data?.message || err.message);
      if (err.response?.status === 403 || err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  const saveEntry = async (d) => {
    if (!d) return;
    try {
      const text = entries[d]?.text || "";
      await api.put(`/magic/entries/${d}`, { text });
      fetchEntry(d);
    } catch (err) {
      console.error("Error saving entry:", err.response?.data?.message || err.message);
      if (err.response?.status === 403 || err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  useEffect(() => {
    if (dayNumber) fetchEntry(dayNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayNumber]);

  const handleChange = (d, value) => {
    setEntries((prev) => ({
      ...prev,
      [d]: { ...(prev[d] || {}), text: value },
    }));
  };

  return (
    <div className="homepage">
      <NavBar />

      {/* Tabs */}
      <div className="magic-nav" style={{ gap: 8 }}>
        <NavLink to="/MagicHome" className="inactive-tab">
          <span className="nav-icon" style={{ gap: 6 }}>
            <img src={pixelStar} alt="" className="pixel-icon" />
            Overview
          </span>
        </NavLink>

        <NavLink to="/MagicDay" className={({ isActive }) => (isActive ? "active-tab" : "inactive-tab")}>
          <span className="nav-icon" style={{ gap: 6 }}>
            <img src={pixelHeart} alt="" className="pixel-icon" />
            Magic -28 Days
          </span>
        </NavLink>

        <NavLink to="/ProgressTracker" className="inactive-tab">
          <span className="nav-icon" style={{ gap: 6 }}>
            <img src={pixelSparkle} alt="" className="pixel-icon" />
            Progress: Tracker
          </span>
        </NavLink>
      </div>

      {current ? (
        // ---------- Single Day ----------
        <div className="content2">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <button
              onClick={() => navigate("/MagicDay")}
              aria-label="Back to days"
              style={{ background: "none", border: "2px solid transparent", padding: 0, cursor: "pointer" }}
            >
              <img
                src="/icons/backButton.png"
                alt="Back"
                style={{ width: 92, height: 32, imageRendering: "pixelated", display: "block" }}
              />
            </button>

            <h2
              style={{
                margin: 0,
                fontFamily: '"Press Start 2P", monospace',
                color: "#4a2c2a",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <img src={pixelStar} alt="" className="pixel-icon small" />
              Day {current.day}
            </h2>
          </div>

          <div className="day-boxes">
            <div className="day-box">
              <h3>
                <img src={pixelSparkle} alt="" className="pixel-icon small" />
                Summary
              </h3>
              <p>{current.summary}</p>
            </div>
            <div className="day-box2">
              <h3>
                <img src={pixelHeart} alt="" className="pixel-icon small" />
                Task
              </h3>
              <p>{current.task}</p>
            </div>
            <div className="day-box3">
              <h3>
                <img src={pixelStar} alt="" className="pixel-icon small" />
                Why
              </h3>
              <p>{current.why}</p>
            </div>
          </div>

          <div
            className="day-template"
            style={{
              border: "4px solid #222",
              boxShadow: "6px 6px 0 #ccc",
              imageRendering: "pixelated",
              padding: "0.8rem 1rem",
            }}
          >
            <h3 style={{ display: "flex", alignItems: "center", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
              <img src={pixelHeart} alt="" className="pixel-icon small" />
              Your Practice
            </h3>

            <textarea
              value={entries[current.day]?.text || ""}
              onChange={(e) => handleChange(current.day, e.target.value)}
              rows={28}
              style={{
                width: "100%",
                minHeight: 350,
                marginTop: "0.5rem",
                padding: "0.75rem",
                fontFamily: '"VT323", monospace',
                fontSize: "1rem",
                border: "3px solid #4a2c2a",
                boxShadow: "3px 3px 0 #4a2c2a",
                background: "#fffce8",
                imageRendering: "pixelated",
                resize: "vertical",
              }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
              <button
                onClick={() => saveEntry(current.day)}
                style={{
                  padding: "0.6rem 1.2rem",
                  fontFamily: '"Press Start 2P", monospace',
                  border: "3px solid #4a2c2a",
                  background: "#ffe0cc",
                  boxShadow: "3px 3px 0 #4a2c2a",
                  cursor: "pointer",
                  imageRendering: "pixelated",
                }}
              >
                Save
              </button>

              <div style={{ fontSize: 13, color: "#555", fontFamily: '"VT323", monospace' }}>
                {entries[current.day]?.updatedAt
                  ? `Last saved: ${new Date(Number(entries[current.day].updatedAt)).toLocaleString()}`
                  : "Not saved yet"}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // ---------- Gallery ----------
        <>
          {Array.from({ length: Math.ceil(allDays.length / 8) }).map((_, groupIndex) => {
            const groupStart = groupIndex * 8;
            const groupDays = allDays.slice(groupStart, groupStart + 8);

            const row1 = groupDays.slice(0, 4);
            const row2 = groupDays.slice(4, 8);

            return (
              <React.Fragment key={groupIndex}>
                <div className="row" style={{ margin: "4rem", gap: "28px" }}>
                  {row1.map((item) => (
                    <figure className="column" key={item.day} style={{ margin: 0 }}>
                      <img
                        src={item.src}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "220px",
                          objectFit: "cover",
                          display: "block",
                          borderRadius: "5%",
                        }}
                      />
                      <figcaption
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "6px 0",
                        }}
                      >
                        <span style={{ fontSize: 14 }}>{item.title}</span>
                        <NavLink to={`/MagicDay/${item.day}`}>Begin →</NavLink>
                      </figcaption>
                    </figure>
                  ))}
                </div>

                {row2.length > 0 && (
                  <div className="row" style={{ margin: "4rem", gap: "28px" }}>
                    {row2.map((item) => (
                      <figure className="column" key={item.day} style={{ margin: 0 }}>
                        <img
                          src={item.src}
                          alt={item.title}
                          style={{
                            width: "100%",
                            height: "220px",
                            objectFit: "cover",
                            display: "block",
                            borderRadius: "5%",
                          }}
                        />
                        <figcaption
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "6px 0",
                          }}
                        >
                          <span style={{ fontSize: 14 }}>{item.title}</span>
                          <NavLink to={`/MagicDay/${item.day}`}>Begin →</NavLink>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}

                {groupIndex < Math.ceil(allDays.length / 8) - 1 && (
                  <div style={{ marginTop: "5rem", marginBottom: "5rem", backgroundColor: "#ffe6f0", padding: "2% 2%" }}>
                    <img
                      src="/images/image1.jpeg"
                      alt="banner"
                      style={{ display: "block", margin: "0 auto", maxWidth: "80%" }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </>
      )}
    </div>
  );
}

export default MagicDay;
