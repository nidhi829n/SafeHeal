import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./luma.css";
import toast from "react-hot-toast";

function Luma() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const token = localStorage.getItem("token");

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post(
        "https://safeheal-backend.onrender.com/api/ai/chat",
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const botMsg = { sender: "ai", text: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
      setInput("");
    } catch (err) {
      toast.error("Luma is having trouble responding");
    }
  };

  return (
    <div className="luma-wrapper">

      <div className="luma-header">
        💬 Luma – Your AI Companion
      </div>

      <div className="luma-chat">
        {messages.length === 0 && (
          <div className="message ai">
            Hi 💚 I'm Luma. Tell me how you're feeling today.
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`message ${m.sender}`}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="luma-input-section">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type how you feel..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div
        className="back-link"
        onClick={() => navigate("/home")}
      >
        ← Back to Home
      </div>

    </div>
  );
}

export default Luma;

