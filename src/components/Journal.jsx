import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChangeBackground from './ChangeBackground';
import "../styles/Journey.css";

function Journal() {
  const [ruleText, setRuleText] = useState(""); // loads from backend and saves back to it
  const [token, setToken] = useState(null);     // fetch it once from localStorage
  const [isLight, setIsLight] = useState(false);

  // load token exactly once
  useEffect(() => {
    const jwt = localStorage.getItem("jwtToken");
    setToken(jwt);
  }, []);

  // fetch the existing rule when you have a token
  useEffect(() => {
    if (!token) return;

    axios.get("http://localhost:8080/rules", {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        setRuleText(res.data.rule || "");
      })
      .catch(err => {
        console.error("❌ Failed to load rule:", err.response?.data || err.message);
      });
  }, [token]);

  const handleSave = async () => {
    try {
      const res = await axios.post("http://localhost:8080/rules", {
        rule: ruleText
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log("✅ Rule saved:", res.data);
    } catch (err) {
      console.error("❌ Save failed:", err.response?.data || err.message);
    }
  };

  // auto-numbering on Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const lines = ruleText.split('\n');
      const nextNumber = lines.length + 1;

      const cursorPosition = e.target.selectionStart;

      const before = ruleText.slice(0, cursorPosition);
      const after = ruleText.slice(cursorPosition);

      const newText = `${before}\n${nextNumber}. ${after}`;
      setRuleText(newText);

      // Move cursor to right position after inserting
      setTimeout(() => {
        const textarea = document.querySelector(".journal-entry");
        if (textarea) {
          textarea.selectionStart = textarea.selectionEnd = cursorPosition + (`\n${nextNumber}. `).length;
        }
      }, 0);
    }
  };

  return (
    <div className="journal-page">
      <textarea
        className={`journal-entry ${isLight ? "light" : "dark"}`}
        placeholder="Start writing your rules..."
        value={ruleText}
        onChange={(e) => setRuleText(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={16}
        aria-label="Journal rules"
      />

      <div className="pixel-action-bar">
        <ChangeBackground toggleColor={() => setIsLight(prev => !prev)} isLight={isLight} />
        <button onClick={handleSave} className="pixel-btn save-btn">
          Save
        </button>
      </div>
    </div>
  );
}

export default Journal;

