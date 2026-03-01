import "./moodCalendar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MoodCalendar() {
  const navigate = useNavigate();

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const moods = {
    "2026-03-01": "😊",
    "2026-03-05": "😢",
    "2026-03-12": "😡",
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

      {/* Stats Section */}
      <div className="mood-stats">
        <div className="stat-card">😊 5 Happy</div>
        <div className="stat-card">😢 2 Sad</div>
        <div className="stat-card">😡 1 Angry</div>
      </div>

      {/* Calendar Box */}
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