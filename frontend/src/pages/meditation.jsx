import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./meditation.css";

function Meditation() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = () => {
    if (!playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setPlaying(!playing);
  };

  return (
    <div className="meditation-bg">
      <div className="meditation-box">
        <h2>🧘 Breathe & Be</h2>
        <p>Sit comfortably, inhale peace 🌿 exhale tension 💨</p>

        <button className="music-btn" onClick={toggleMusic}>
          {playing ? "⏸ Pause Music" : "▶ Play Calm Music"}
        </button>

        <span className="back-link" onClick={() => navigate("/home")}>
          ← Back to Home
        </span>

        {/* Hidden audio */}
        <audio ref={audioRef} src="/calm.mp3" loop />
      </div>
    </div>
  );
}

export default Meditation;
