import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./moodCalendar.css";

const moodEmoji = {
  Happy: "😊",
  Okay: "🙂",
  Sad: "😢",
  Angry: "😡",
  Anxious: "😰",
  Stressed: "😫",
};

function MoodCalendar() {
  const [moods, setMoods] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMoods = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/moods", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMoods(res.data);
    };
    fetchMoods();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getMoodForDay = (day) => {
    const found = moods.find((m) => {
      const d = new Date(m.date);
      return (
        d.getDate() === day &&
        d.getMonth() === month &&
        d.getFullYear() === year
      );
    });
    return found ? moodEmoji[found.mood] : "";
  };

  return (
    <div className="calendar-page">
      <h2 className="title">📅 Mood Calendar</h2>
      <p className="subtitle">A gentle snapshot of your emotions 🌿</p>

      {/* ✅ CARD ONLY */}
      <div className="calendar-card">

        <div className="month-header">
          <button onClick={() => setCurrentDate(new Date(year, month - 1))}>◀</button>
          <h3>
            {currentDate.toLocaleString("default", { month: "long" })} {year}
          </h3>
          <button onClick={() => setCurrentDate(new Date(year, month + 1))}>▶</button>
        </div>

        <div className="calendar-grid">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
            <div key={d} className="day-name">{d}</div>
          ))}

          {Array(firstDay).fill(null).map((_,i)=><div key={i}></div>)}

          {Array(daysInMonth).fill(null).map((_, i) => (
            <div key={i} className="calendar-day">
              <span>{i + 1}</span>
              <div className="emoji">{getMoodForDay(i + 1)}</div>
            </div>
          ))}
        </div>
      </div>

      <span className="back" onClick={() => navigate("/home")}>
        ← Back to Home
      </span>
    </div>
  );
}

export default MoodCalendar;




