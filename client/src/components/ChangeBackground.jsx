import React from 'react';


export default function ChangeBackground({ toggleColor, isLight }) {
  return (
    <button
      type="button"
      onClick={toggleColor}
      aria-pressed={!!isLight}
      className={`pixel-toggle ${isLight ? "active" : ""}`}
    >
      {isLight ? "Light" : "Cozy"}
    </button>
  );
}
