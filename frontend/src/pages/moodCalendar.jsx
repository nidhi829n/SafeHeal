import "./moodCalendar.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MoodCalendar() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [moods, setMoods] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const res = await axios.get(
        "https://safeheal-backend.onrender.com/api/moods",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Convert array to date-based object
      const moodMap = {};
      res.data.forEach((item) => {
        const date = new Date(item.date)
          .toISOString()
          .split("T")[0];
        moodMap[date] = getEmoji(item.mood);
      });

      setMoods(moodMap);
    } catch (err) {
      console.log(err);
    }
  };

  const getEmoji = (mood) => {
    switch (mood) {
      case "Happy":
        return "😊";
      case "Sad":
        return "😢";
      case "Angry":
        return "😡";
      case "Anxious":
        return "😰";
      case "Stressed":
        return "😣";
      case "Okay":
        return "🙂";
      default:
        return "";
    }
  };

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
  });

  const year = currentMonth.getFullYear();

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <h1>📅 Mood Calendar</h1>
        <p>A gentle snapshot of your emotions 🌿</p>
      </div>

      <div className="calendar-container">
        <div className="month-nav">
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(year, currentMonth.getMonth() - 1)
              )
            }
          >
            ◀
          </button>

          <h2>
            {monthName} {year}
          </h2>

          <button
            onClick={() =>
              setCurrentMonth(
                new Date(year, currentMonth.getMonth() + 1)
              )
            }
          >
            ▶
          </button>
        </div>

        <div className="calendar-grid">
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;

            const dateKey = `${year}-${String(
              currentMonth.getMonth() + 1
            ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

            return (
              <div key={day} className="day-card">
                <span className="day-number">{day}</span>
                <span className="day-emoji">
                  {moods[dateKey] || ""}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <button
        className="back-btn"
        onClick={() => navigate("/home")}
      >
        ← Back to Home
      </button>
    </div>
  );
}

export default MoodCalendar;