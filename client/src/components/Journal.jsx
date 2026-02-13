import React, { useEffect, useState } from "react";
import ChangeBackground from "./ChangeBackground";
import "../styles/Journey.css";
import { api, getToken } from "../lib/api";

function Journal() {
  const [ruleText, setRuleText] = useState("");
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    api
      .get("/rules")
      .then((res) => {
        setRuleText(res.data.rule || "");
      })
      .catch((err) => {
        console.error(" Failed to load rule:", err.response?.data || err.message);
      });
  }, []);

  const handleSave = async () => {
    const token = getToken();
    if (!token) {
      console.error(" No token found. Login first.");
      return;
    }

    try {
      const res = await api.post("/rules", { rule: ruleText });
      console.log("Rule saved:", res.data);
    } catch (err) {
      console.error(" Save failed:", err.response?.data || err.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const lines = ruleText.split("\n");
      const nextNumber = lines.length + 1;
      const cursorPosition = e.target.selectionStart;

      const before = ruleText.slice(0, cursorPosition);
      const after = ruleText.slice(cursorPosition);

      const newText = `${before}\n${nextNumber}. ${after}`;
      setRuleText(newText);

      setTimeout(() => {
        const textarea = document.querySelector(".journal-entry");
        if (textarea) {
          textarea.selectionStart = textarea.selectionEnd =
            cursorPosition + (`\n${nextNumber}. `).length;
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
        <ChangeBackground toggleColor={() => setIsLight((prev) => !prev)} isLight={isLight} />
        <button onClick={handleSave} className="pixel-btn save-btn">
          Save
        </button>
      </div>
    </div>
  );
}

export default Journal;
