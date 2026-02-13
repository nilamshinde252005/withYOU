import React, { useRef, useState, useEffect } from "react";
import "../styles/SoundTestPixel.css"; 


export default function SoundTest() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrent(audio.currentTime || 0);
    const onEnd = () => setPlaying(false);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const play = () => {
    const a = audioRef.current;
    if (!a) return;
    a.play()
      .then(() => setPlaying(true))
      .catch((e) => {
        console.error("Play blocked or error:", e);
        alert("Playback blocked by browser or error. Try clicking the page first.");
      });
  };

  const pause = () => {
    const a = audioRef.current;
    a && a.pause();
    setPlaying(false);
  };

  const stop = () => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    setPlaying(false);
  };

  const seek = (s) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = s;
  };

  const fmt = (sec) => {
    if (!sec && sec !== 0) return "--:--";
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // inside your SoundTest useEffect that listens to timeupdate
useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  // restore saved time
  const saved = sessionStorage.getItem("sound-current");
  if (saved) audio.currentTime = Number(saved);

  const onTime = () => {
    setCurrent(audio.currentTime || 0);
    sessionStorage.setItem("sound-current", String(audio.currentTime || 0));
  };

  audio.addEventListener("timeupdate", onTime);
  return () => audio.removeEventListener("timeupdate", onTime);
}, []);

  return (
    <div className="pixel-player-card">
      <audio ref={audioRef} src="/src/assets/we will rock you instrumental.mp3" preload="metadata" />
      

      <div className="pixel-track-info">
        <div className="pixel-track-title">Tone — Instrumental</div>
        <div className="pixel-times">
          <span className="pixel-time">{fmt(current)}</span>
          <span className="pixel-time">/</span>
          <span className="pixel-time">{fmt(duration)}</span>
        </div>
      </div>

      <div className="pixel-controls">
        <button className="pixel-btn" onClick={play} disabled={playing} aria-label="Play">
          ▶
        </button>
        <button className="pixel-btn" onClick={pause} aria-label="Pause">
          ❚❚
        </button>
        <button className="pixel-btn" onClick={stop} aria-label="Stop">
          ■
        </button>
      </div>

      <div className="pixel-seek">
        <input
          className="pixel-range"
          type="range"
          min={0}
          max={Math.max(0, duration)}
          value={current}
          onChange={(e) => seek(Number(e.target.value))}
          step="0.1"
        />
      </div>

      <div className="pixel-foot" >
        <div className="pixel-chip">▶ i lovee matcha</div>
        <div className="pixel-tip">click to play</div>
      </div>
    </div>
  );
}


