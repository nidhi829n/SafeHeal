import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./affirmation.css";
import toast from "react-hot-toast";

function AddAffirmation() {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const submitAffirmation = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://safeheal-backend.onrender.com/api/affirmations",
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Affirmation added 🌱");
      navigate("/affirmation");
    } catch (error) {
      console.log(error);
      alert("Error adding affirmation");
    }
  };

  return (
    <div className="affirmation-page">
      <div className="affirmation-card">
        <h2>➕ Add Affirmation</h2>

        <textarea
          placeholder="Enter positive affirmation..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={submitAffirmation}>Save</button>

        <span className="back" onClick={() => navigate("/affirmation")}>
          ← Back
        </span>
      </div>
    </div>
  );
}

export default AddAffirmation;

