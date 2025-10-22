import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas"; // npm i html2canvas
import "../styles/Wallpaper2.css";
import NavBar from "../components/NavBar";

const STICKERS = [
    { id: "star", src: "/public/decor/2.jpg", w: 60, h: 60 },
    { id: "sparkle", src: "/public/decor/3.jpg", w: 56, h: 56 },
    { id: "heart", src: "/public/decor/4.jpg", w: 64, h: 64 },
];

const STORAGE_KEY = "magic_wallpaper_v1";

export default function WallpaperBuilder() {
    const [bgColor, setBgColor] = useState("#ffe6f0");
    const [note, setNote] = useState("");
    const [stickers, setStickers] = useState([]); // {uid, id, src, x, y, w, h}
    const [selectedStickerId, setSelectedStickerId] = useState(STICKERS[0].id);
    const canvasRef = useRef(null);

    // Load saved state once on mount
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const obj = JSON.parse(raw);
            if (obj.bgColor) setBgColor(obj.bgColor);
            if (obj.note) setNote(obj.note);
            if (Array.isArray(obj.stickers)) setStickers(obj.stickers);
        } catch (err) {
            console.error("Failed to load saved wallpaper:", err);
        }
    }, []);

    // Auto-save state (consider debouncing if typing very fast)
    useEffect(() => {
        try {
            const payload = { bgColor, note, stickers };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        } catch (err) {
            console.error("Failed to save wallpaper state:", err);
        }
    }, [bgColor, note, stickers]);

    const getStickerMeta = (id) => STICKERS.find((s) => s.id === id) || STICKERS[0];

    // Handle click / touch on canvas to place a sticker
    const handleCanvasClick = (e) => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();

        // support touch event coordinates
        const clientX = e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX);
        const clientY = e.clientY ?? (e.touches && e.touches[0] && e.touches[0].clientY);
        if (clientX == null || clientY == null) return;

        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const meta = getStickerMeta(selectedStickerId);

        const uid =
            typeof crypto !== "undefined" && crypto.randomUUID
                ? crypto.randomUUID()
                : Date.now() + Math.floor(Math.random() * 1000);

        const newSticker = {
            uid,
            id: meta.id,
            src: meta.src,
            x: x - meta.w / 2,
            y: y - meta.h / 2,
            w: meta.w,
            h: meta.h,
        };

        // Optional: clamp so sticker stays within canvas bounds
        const canvasW = rect.width;
        const canvasH = rect.height;
        newSticker.x = Math.max(0, Math.min(newSticker.x, canvasW - newSticker.w));
        newSticker.y = Math.max(0, Math.min(newSticker.y, canvasH - newSticker.h));

        setStickers((s) => [...s, newSticker]);
    };

    // Delete a single sticker (confirm to avoid accidents)
    const handleStickerClick = (uid) => {
        const should = window.confirm("Delete this sticker?");
        if (!should) return;
        setStickers((s) => s.filter((st) => st.uid !== uid));
    };

    // Export canvas as PNG using html2canvas
    const handleExport = async () => {
        if (!canvasRef.current) return;
        try {
            // scale: increase for higher resolution (memory cost)
            const canvas = await html2canvas(canvasRef.current, {
                backgroundColor: null,
                useCORS: true,
                scale: 1,
            });
            const dataUrl = canvas.toDataURL("image/png");
            const a = document.createElement("a");
            a.href = dataUrl;
            a.download = "magic-wallpaper.png";
            a.click();
        } catch (err) {
            console.error("Export failed", err);
            alert("Export failed. See console for details.");
        }
    };

    // Clear canvas (with confirmation)
    const handleClear = () => {
        const should = window.confirm("Clear canvas and remove saved design?");
        if (!should) return;
        setStickers([]);
        setNote("");
        setBgColor("#ffffff");
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (err) {
            console.error("Failed to remove saved key:", err);
        }
    };

    return (
        <div className="homepage">
            <NavBar />


            <div className="wallpaper-page">
                <h2>Wallpaper Builder</h2>

                <div className="builder-controls">
                    <div className="control-group">
                        <label>Background color</label>
                        <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            aria-label="Background color"
                        />
                    </div>

                    <div className="control-group">
                        <label>Choose sticker (click canvas to place)</label>
                        <div className="sticker-palette">
                            {STICKERS.map((s) => (
                                <button
                                    key={s.id}
                                    className={`sticker-btn ${selectedStickerId === s.id ? "selected" : ""}`}
                                    onClick={() => setSelectedStickerId(s.id)}
                                    title={`Select ${s.id}`}
                                    aria-pressed={selectedStickerId === s.id}
                                >
                                    <img src={s.src} alt={s.id} style={{ width: 40, height: 40 }} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="control-group">
                        <label>Notes (editable)</label>
                        <textarea className="textarea" value={note} onChange={(e) => setNote(e.target.value)} rows={3} />
                    </div>

                    <div className="control-actions">
                        <button onClick={handleExport}>Export PNG</button>
                        <button onClick={handleClear} className="ghost">
                            Clear
                        </button>
                    </div>
                </div>

                <div
                    className="wallpaper-canvas"
                    ref={canvasRef}
                    onClick={handleCanvasClick}
                    style={{ backgroundColor: bgColor }}
                    role="img"
                    aria-label="User wallpaper canvas"
                >
                    <div className="wallpaper-note">
                        {note.split("\n").map((line, idx) => (
                            <div key={idx}>{line}</div>
                        ))}
                    </div>

                    {stickers.map((st) => (
                        <img
                            key={st.uid}
                            src={st.src}
                            alt={st.id}
                            onClick={(e) => {
                                // stop the canvas click (in case of event bubbling)
                                e.stopPropagation();
                                handleStickerClick(st.uid);
                            }}
                            style={{
                                position: "absolute",
                                left: st.x,
                                top: st.y,
                                width: st.w,
                                height: st.h,
                                cursor: "pointer",
                                imageRendering: "pixelated",
                            }}
                            title="Click to remove"
                        />
                    ))}
                </div>

                <div className="hint">Tip: Click a sticker to remove it. Click canvas to place a sticker.</div>
            </div>
        </div>
    );
}