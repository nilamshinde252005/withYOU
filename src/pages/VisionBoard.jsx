import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import "../styles/Wallpaper.css";
import NavBar from "../components/NavBar";

const PALETTE = [
  "/decor/1.jpg",
  "/decor/2.jpg",
  "/decor/3.jpg",
  "/decor/4.jpg",
  "/decor/5.jpg",
  "/decor/6.jpg",
];

const STORAGE_KEY = "visionboard_v1";

export default function VisionBoard() {
  const defaultSlots = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    img: null,
    caption: "",
  }));

  const [slots, setSlots] = useState(defaultSlots);
  const [selectedPalette, setSelectedPalette] = useState(null); // touch / click fallback
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const boardRef = useRef(null);

  // Load saved state once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const obj = JSON.parse(raw);
      if (Array.isArray(obj.slots)) setSlots(obj.slots);
    } catch (err) {
      console.error("Failed to load saved vision board:", err);
    }
  }, []);

  // Auto-save
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ slots }));
    } catch (err) {
      console.error("Failed to save vision board:", err);
    }
  }, [slots]);

  // Drag start from palette
  const handleDragStart = (e, src) => {
    e.dataTransfer.setData("text/plain", src);
    // so mobile browsers know it's an image
    try {
      e.dataTransfer.setData("text/uri-list", src);
    } catch {}
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    setDragOverIndex(null);
    const src = e.dataTransfer.getData("text/plain") || e.dataTransfer.getData("text/uri-list");
    if (!src) return;
    setSlots((prev) => {
      const cp = prev.map((s) => ({ ...s }));
      cp[index].img = src;
      return cp;
    });
    setSelectedPalette(null);
  };

  // Click/tap fallback: select palette then click slot
  const placeSelectedToSlot = (index) => {
    if (!selectedPalette) return;
    setSlots((prev) => {
      const cp = prev.map((s) => ({ ...s }));
      cp[index].img = selectedPalette;
      return cp;
    });
    setSelectedPalette(null);
  };

  const handleCaptionChange = (index, value) => {
    setSlots((prev) => {
      const cp = prev.map((s) => ({ ...s }));
      cp[index].caption = value;
      return cp;
    });
  };

  const clearSlot = (index) => {
    const should = window.confirm("Clear this slot?");
    if (!should) return;
    setSlots((prev) => {
      const cp = prev.map((s) => ({ ...s }));
      cp[index].img = null;
      cp[index].caption = "";
      return cp;
    });
  };

  const clearBoard = () => {
    const should = window.confirm("Clear entire board?");
    if (!should) return;
    setSlots(defaultSlots);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error("Failed to remove saved key:", err);
    }
  };

  // Export to PNG
  const handleExport = async () => {
    if (!boardRef.current) return;
    try {
      // ensure images loaded — small delay helps with stray lazy-loading
      await new Promise((r) => setTimeout(r, 80));
      const canvas = await html2canvas(boardRef.current, {
        useCORS: true,
        backgroundColor: "#fff",
        scale: Math.min(2, window.devicePixelRatio || 1),
      });
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "vision-board.png";
      a.click();
    } catch (err) {
      console.error("Export failed", err);
      alert("Export failed — check console (CORS or large image sizes are common culprits).");
    }
  };

  // Touch: tap palette -> tap slot
  const handlePaletteTouch = (src) => {
    setSelectedPalette(src === selectedPalette ? null : src);
  };

  return (
    <div className="homepage">
      <NavBar />

      <div className="visionboard-container">
        <aside className="palette">
          <h3>Palette</h3>
          <div className="palette-grid" role="list">
            {PALETTE.map((src) => {
              const isSelected = selectedPalette === src;
              return (
                <button
                  key={src}
                  className={`palette-item ${isSelected ? "selected" : ""}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, src)}
                  onClick={() => setSelectedPalette(src)}
                  onTouchStart={() => handlePaletteTouch(src)}
                  aria-pressed={isSelected}
                  title="Drag or tap then place on a slot"
                >
                  <img src={src} alt="palette item" />
                </button>
              );
            })}
          </div>

          <div className="palette-actions">
            <button onClick={handleExport}>Export PNG</button>
            <button className="ghost" onClick={clearBoard}>
              Clear Board
            </button>
          </div>

          <p className="hint">Tip: drag from palette & drop into any slot. On mobile: tap a palette image, then tap a slot.</p>
        </aside>

        <main className="board-wrap">
          <h2 className="board-title">Vision Board</h2>

          <div className="board" ref={boardRef}>
            {slots.map((slot, idx) => (
              <div
                key={slot.id}
                className={`slot ${dragOverIndex === idx ? "drop-over" : ""}`}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDrop={(e) => handleDrop(e, idx)}
                onClick={() => placeSelectedToSlot(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") placeSelectedToSlot(idx);
                }}
              >
                <div className="slot-image">
                  {slot.img ? (
                    <img src={slot.img} alt={`slot ${idx}`} draggable={false} />
                  ) : (
                    <div className="placeholder">Drop image here</div>
                  )}
                </div>

                <textarea
                  className="caption"
                  placeholder="Write your caption..."
                  value={slot.caption}
                  onChange={(e) => handleCaptionChange(idx, e.target.value)}
                  rows={2}
                />

                <div className="slot-actions">
                  <button onClick={(e) => { e.stopPropagation(); clearSlot(idx); }}>Clear</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
