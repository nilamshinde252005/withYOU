import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import { api } from "../lib/api";

// Tiny inline pixel SVG icons (user + lock) to avoid external assets
const UserIcon = ({ className = "" }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="2" ry="2" fill="#fff" />
    <g transform="scale(0.9) translate(1.5,1.5)">
      <rect x="6" y="3" width="12" height="12" fill="#ffd166" />
      <rect x="8" y="5" width="8" height="8" fill="#d6c7ff" />
      <rect x="9.5" y="6.5" width="5" height="5" fill="#fff" />
    </g>
  </svg>
);

const LockIcon = ({ className = "" }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="2" ry="2" fill="#fff" />
    <g transform="scale(0.9) translate(1.5,1.5)">
      <rect x="5" y="9" width="14" height="9" rx="2" fill="#bde0fe" />
      <rect x="9" y="12" width="6" height="4" rx="1" fill="#fff" />
      <rect x="7.5" y="4.5" width="9" height="7" rx="3" fill="#ffd166" />
    </g>
  </svg>
);

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/login", { username, password });


      localStorage.setItem("token", res.data.token);
localStorage.setItem("jwtToken", res.data.token); // backward compatible



      setTimeout(() => {
        window.location.href = "/home";
      }, 250);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-page">
      <div className={`login-card ${error ? "shake" : ""}`} role="region" aria-labelledby="login-title">
        <div className="pixel-topbar">
          <div className="pixel-logo" aria-hidden="true">
            {/* Pixel logo using small squares */}
            <div className="pixel-row">
              <span className="p s1" />
              <span className="p s2" />
              <span className="p s3" />
            </div>
            <div className="pixel-row">
              <span className="p s2" />
              <span className="p s1" />
              <span className="p s2" />
            </div>
          </div>

          <div className="title-block">
            <h1 id="login-title">Sign In</h1>
            <div className="subtitle">hehehe</div>
          </div>

          <div className="avatar-slot" title="Your avatar (drop a small 64×64 PNG into /public/avatars/avatar1.png)">
            <img
              src="/avatars/avatar1.png"
              alt=""
              onError={(e) => (e.currentTarget.style.visibility = "hidden")}
            />
          </div>
        </div>

        <form className="login-form" onSubmit={onSubmit} noValidate>
          <label className="sr-only" htmlFor="username">Username</label>
          <div className="input-row">
            <div className="input-icon"><UserIcon /></div>
            <input
              id="username"
              className="pixel-input"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <label className="sr-only" htmlFor="password">Password</label>
          <div className="input-row">
            <div className="input-icon"><LockIcon /></div>
            <input
              id="password"
              className="pixel-input"
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <div className="actions-row">
            <button type="submit" className={`pixel-btn ${loading ? "loading" : ""}`} disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </button>
            <button
              type="button"
              className="pixel-btn"
              onClick={() => {
                setUsername("");
                setPassword("");
                setError("");
              }}
            >
              Reset
            </button>
          </div>

          {error && <p className="error">{error}</p>}
          <div className="tiny-note">Forgot password? <a href="/reset">Reset</a></div>
        </form>

        <div className="decor-row">
          <span className="sticker s-star" aria-hidden="true" />
          <span className="sticker s-spark" aria-hidden="true" />
          <span className="sticker s-heart" aria-hidden="true" />
          <div className="tiny-note"><a href="/register">Sign up?</a></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
