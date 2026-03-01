import "./moodCalendar.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MoodCalendar() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [moods, setMoods] = useState({});

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth() + 1;

  const daysInMonth = new Date(year, month, 0).getDate();

  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
  });

  // 🔥 Fetch moods from backend
  useEffect(() => {
    const fetchMoods = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          "https://safeheal-backend.onrender.com/api/mood",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const moodMap = {};

        res.data.forEach((item) => {
          moodMap[item.date] = item.mood;
        });

        setMoods(moodMap);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMoods();
  }, [currentMonth]);

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <h1>📅 Mood Calendar</h1>
        <p>Your emotional journey 🌿</p>
      </div>

      <div className="calendar-container">
        <div className="month-nav">
          <button
            onClick={() =>
              setCurrentMonth(new Date(year, month - 2))
            }
          >
            ◀
          </button>

          <h2>
            {monthName} {year}
          </h2>

          <button
            onClick={() =>
              setCurrentMonth(new Date(year, month))
            }
          >
            ▶
          </button>
        </div>

        <div className="calendar-grid">
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;

            const dateKey = `${year}-${String(month).padStart(
              2,
              "0"
            )}-${String(day).padStart(2, "0")}`;

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