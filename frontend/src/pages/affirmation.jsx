import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./affirmation.css";

function Affirmation() {
  const [affirmation, setAffirmation] = useState("");
  const navigate = useNavigate();

  const getAffirmation = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/api/affirmations/random",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAffirmation(res.data.text);
    } catch (error) {
      console.log(error);
      alert("Error fetching affirmation");
    }
  };

  useEffect(() => {
    getAffirmation();
  }, []);

  return (
    <div className="affirmation-page">
      <div className="affirmation-card">
        <h2>🌱 Positive Affirmations</h2>
        <p>💚 {affirmation}</p>

        <button onClick={getAffirmation}>
          ✨ Next Affirmation
        </button>

        <button onClick={() => navigate("/add-affirmation")}>
          ➕ Add Affirmation
        </button>

        <span className="back" onClick={() => navigate("/home")}>
          ← Back to Home
        </span>
      </div>
    </div>
  );
}

export default Affirmation;

