import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mood.css";

function Mood() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);

  const handleContinue = () => {
    if (!selectedMood) return;
    navigate("/home");
  };

  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "🙂", label: "Okay" },
    { emoji: "😢", label: "Sad" },
    { emoji: "😡", label: "Angry" },
    { emoji: "😰", label: "Anxious" },
    { emoji: "😣", label: "Stressed" },
  ];

  return (
    <div className="mood-wrapper">
      <div className="mood-card">
        <h2>Hi 👋</h2>
        <p>How are you feeling today?</p>

        <div className="mood-grid">
          {moods.map((mood) => (
            <div
              key={mood.label}
              className={`mood-item ${
                selectedMood === mood.label ? "selected" : ""
              }`}
              onClick={() => setSelectedMood(mood.label)}
            >
              <span>{mood.emoji}</span>
              <p>{mood.label}</p>
            </div>
          ))}
        </div>

        <button
          className="continue-btn"
          disabled={!selectedMood}
          onClick={handleContinue}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

export default Mood;