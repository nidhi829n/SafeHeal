import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mood.css";
import axios from "axios";
import toast from "react-hot-toast";

function Mood() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);
  const [loading, setLoading] = useState(false);

  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "🙂", label: "Okay" },
    { emoji: "😢", label: "Sad" },
    { emoji: "😡", label: "Angry" },
    { emoji: "😰", label: "Anxious" },
    { emoji: "😣", label: "Stressed" },
  ];

  const handleContinue = async () => {
    if (!selectedMood) return;

    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://safeheal-backend.onrender.com/api/moods",
        {
          mood: selectedMood,
          note: "",
          date: new Date().toISOString().split("T")[0], 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Mood saved 🌿");
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error("Could not save mood");
    } finally {
      setLoading(false);
    }
  };

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
          disabled={!selectedMood || loading}
          onClick={handleContinue}
        >
          {loading ? "Saving..." : "Continue →"}
        </button>
      </div>
    </div>
  );
}

export default Mood;