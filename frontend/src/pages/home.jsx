import "./home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName"); 

  return (
    <div className="home-container">
      {}
      <div className="home-header">
        <h2>Hello, {userName} 🤍</h2>
        <p>"You are stronger than you think, even on the quiet days 🌿"</p>
      </div>

      {}
      <div className="home-main-card">
        <h3>What would help you right now?</h3>
        <p>Choose what feels right for you today. There's no pressure.</p>
      </div>

      {}
      <div className="home-grid">
        <div className="home-card" onClick={() => navigate("/calendar")}>
          <h4>📅 Mood Calendar</h4>
          <p>Track emotions and notice patterns over time.</p>
          <span>Open →</span>
        </div>

        <div className="home-card" onClick={() => navigate("/meditation")}>
          <h4>🧘 Meditation</h4>
          <p>Slow down your breath and calm your mind.</p>
          <span>Open →</span>
        </div>

        <div className="home-card" onClick={() => navigate("/affirmation")}>
          <h4>🌱 Affirmations</h4>
          <p>Positive reminders to uplift your mood.</p>
          <span>Open →</span>
        </div>

        <div className="home-card" onClick={() => navigate("/luma")}>
          <h4>💬 Luma AI</h4>
          <p>A safe, judgement-free space to talk.</p>
          <span>Open →</span>
        </div>
      </div>
    </div>
  );
}

export default Home;

