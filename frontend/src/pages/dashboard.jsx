import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to Bothered? 🌿</h1>
      <p>How are you feeling today?</p>

      <button onClick={() => navigate("/mood")}>Mood Tracker</button>
      <br /><br />
      <button onClick={() => navigate("/meditation")}>Meditation</button>
      <br /><br />
      <button onClick={() => navigate("/affirmation")}>Affirmations</button>
      <br /><br />
      <button onClick={() => navigate("/chat")}>Talk to Luma</button>
      <br /><br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
