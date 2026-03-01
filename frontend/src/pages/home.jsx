import "./home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";

  const features = [
    {
      title: "Mood Calendar",
      desc: "Track emotions and notice patterns over time.",
      route: "/calendar",
      icon: "📅",
    },
    {
      title: "Meditation",
      desc: "Slow down your breath and calm your mind.",
      route: "/meditation",
      icon: "🧘",
    },
    {
      title: "Affirmations",
      desc: "Positive reminders to uplift your mood.",
      route: "/affirmation",
      icon: "🌱",
    },
    {
      title: "Luma AI",
      desc: "A safe, judgement-free space to talk.",
      route: "/luma",
      icon: "💬",
    },
  ];

  return (
    <div className="home-wrapper">
      <div className="floating-bg"></div>

      <div className="home-content">
        <div className="hero">
          <h1>Hello, {userName} 💜</h1>
          <p>"You are stronger than you think, even on the quiet days 🌿"</p>
        </div>

        <div className="feature-grid">
          {features.map((item) => (
            <div
              key={item.title}
              className="feature-card"
              onClick={() => navigate(item.route)}
            >
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span>Explore →</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;