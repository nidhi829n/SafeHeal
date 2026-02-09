import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Mood() {
  const [selectedMood, setSelectedMood] = useState("");
  const navigate = useNavigate(); 

  const moods = [
    { label: "Happy", emoji: "😊" },
    { label: "Okay", emoji: "🙂" },
    { label: "Sad", emoji: "😢" },
    { label: "Angry", emoji: "😡" },
    { label: "Anxious", emoji: "😰" },
    { label: "Stressed", emoji: "😫" },
  ];

  const saveMood = async (mood) => {
    setSelectedMood(mood);
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://safeheal-backend.onrender.com/api/moods",
        { mood },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Mood saved!");
      navigate("/home"); 
    } catch (error) {
      console.log(error);
      alert("Error saving mood");
    }
  };

  return (
    <div className="mood-container">
      <h2>Hi 👋</h2>
      <p>How are you feeling today?</p>

      <div className="mood-grid">
        {moods.map((m) => (
          <button
            key={m.label}
            className={`mood-btn ${selectedMood === m.label ? "active" : ""}`}
            onClick={() => saveMood(m.label)}
          >
            <div style={{ fontSize: "30px" }}>{m.emoji}</div>
            <div>{m.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Mood;


