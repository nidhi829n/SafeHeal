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
    if (!input) return;

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

      const botMsg = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
      setInput("");
    } catch (err) {
      console.log(err);
      toast.error("Luma is having trouble responding");
    }
  };

  return (
    <div className="luma-container">
      <h2>💬 Luma – Your AI Companion</h2>

      <div className="chat-box">
        {messages.map((m, i) => (
          <div key={i} className={m.sender}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type how you feel..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <p className="back" onClick={() => navigate("/home")}>
        ← Back to Home
      </p>
    </div>
  );
}

export default Luma;


