import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.user.name); 

      toast.success("Login successful ✅");

      
      navigate("/mood");
    } catch (error) {
      toast.error("Invalid credentials ❌");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        "https://safeheal-backend.onrender.com/api/auth/google",
        { credential: credentialResponse.credential }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.user?.name || "User");

      toast.success("Logged in with Google 🎉");
      navigate("/mood");
    } catch (error) {
      toast.error("Google login failed ❌");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>🌿 Welcome Back</h2>
        <p>It's good to see you again</p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

         <button className="primary-btn" onClick={handleLogin}>
          Login
        </button>

        <div className="divider">OR</div>

        <div className="google-btn">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google Login Failed ❌")}
          />
        </div>

        <div className="link-text">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
