import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { api } from "../lib/api";
// deploy trigger


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

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!username) return "Please enter an email/username.";
    if (!username.includes("@")) return "Please enter a valid email address.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirm) return "Passwords do not match.";
    return null;
  };

  const handleRegister = async () => {
    setError("");
    const v = validate();
    if (v) return setError(v);

    setLoading(true);

    try {
      // ✅ backend register (uses VITE_API_URL base)
      const res = await api.post("/register", { username, password });

      if (res.data?.token) {
        localStorage.setItem("jwtToken", res.data.token);
      }

      // ✅ go to login
      navigate("/");
    } catch (err) {
      // fallback localStorage (your old behavior)
      try {
        const raw = localStorage.getItem("userInformation");
        const users = raw ? JSON.parse(raw) : [];

        if (users.some((u) => u.username === username)) {
          setError("An account with that email already exists (local fallback). Try logging in.");
          setLoading(false);
          return;
        }

        const newUser = {
          username,
          password,
          todos: [],
          userRules: [],
          userHeavyJournal: [],
          userLightJournal: [],
          magicEntries: {}
        };

        users.push(newUser);
        localStorage.setItem("userInformation", JSON.stringify(users));

        // your fallback used to go home
        navigate("/home");
      } catch (fallbackErr) {
        setError(err.response?.data?.message || "Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <div className="login-page">
      <div className={`login-card ${error ? "shake" : ""}`} role="region" aria-labelledby="register-title">
        <div className="pixel-topbar">
          <div className="pixel-logo" aria-hidden="true">
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
            <h1 id="register-title">Create Account</h1>
            <div className="subtitle">heheeheee</div>
          </div>

          {/* ✅ this path requires: public/avatars/avatar1.png */}
          <div className="avatar-slot" title="Optional avatar: put a PNG in /public/avatars/avatar1.png">
            <img
              src="/avatars/avatar1.png"
              alt=""
              onError={(e) => (e.currentTarget.style.visibility = "hidden")}
            />
          </div>
        </div>

        <form className="login-form" onSubmit={onSubmit} noValidate>
          <label className="sr-only" htmlFor="reg-username">Email</label>
          <div className="input-row">
            <div className="input-icon"><UserIcon /></div>
            <input
              id="reg-username"
              className="pixel-input"
              placeholder="you@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <label className="sr-only" htmlFor="reg-password">Password</label>
          <div className="input-row">
            <div className="input-icon"><LockIcon /></div>
            <input
              id="reg-password"
              className="pixel-input"
              placeholder="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="icon-toggle"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <label className="sr-only" htmlFor="reg-confirm">Confirm password</label>
          <div className="input-row">
            <div className="input-icon"><LockIcon /></div>
            <input
              id="reg-confirm"
              className="pixel-input"
              placeholder="confirm password"
              type={showPassword ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="actions-row">
            <button type="submit" className={`pixel-btn ${loading ? "loading" : ""}`} disabled={loading}>
              {loading ? "Creating…" : "Create account"}
            </button>
            <button
              type="button"
              className="pixel-btn"
              onClick={() => { setUsername(""); setPassword(""); setConfirm(""); setError(""); }}
            >
              Reset
            </button>
          </div>

          {error && <p className="error">{error}</p>}

          {/* ✅ use Link, not <a href> (prevents full page reload) */}
          <div className="tiny-note">
            Already have an account? <Link to="/">Sign in</Link>
          </div>
        </form>

        <div className="decor-row">
          <span className="sticker s-star" aria-hidden="true" />
          <span className="sticker s-spark" aria-hidden="true" />
          <span className="sticker s-heart" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
