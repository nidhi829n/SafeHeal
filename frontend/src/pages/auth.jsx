import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isSignup) {
        await axios.post(
          "https://safeheal-backend.onrender.com/api/auth/signup",
          { name, email, password }
        );
        toast.success("Signup successful 🎉");
        setIsSignup(false);
      } else {
        const res = await axios.post(
          "https://safeheal-backend.onrender.com/api/auth/login",
          { email, password }
        );

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.user.name);

        toast.success("Login successful ✅");
        navigate("/mood");
      }
    } catch (err) {
      toast.error("Something went wrong ❌");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        "https://safeheal-backend.onrender.com/api/auth/google",
        { credential: credentialResponse.credential }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.user.name);

      toast.success("Logged in with Google 🎉");
      navigate("/mood");
    } catch (error) {
      toast.error("Google login failed ❌");
    }
  };

  return (
    <div className="auth-wrapper">
      {/* LEFT SIDE */}
   <div className="auth-left">
  <div className="left-content">
    <h1>Grow Your Mind Daily</h1>
    <p>
      Track moods, reflect deeply and build a healthier mindset.
    </p>

    <img src="/brain.png" alt="Mind Illustration" className="hero-img" />

    <div className="testimonial">
      <p>
        “SafeHeal helped me reconnect with myself in just minutes a day.”
      </p>
      <span>— A Happy User</span>
    </div>
  </div>
</div>

      {/* RIGHT SIDE */}
      <div className="auth-right">
        <div className="auth-card">
          <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>

          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

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

          <button onClick={handleSubmit}>
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <div className="divider">OR</div>

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google login failed ❌")}
          />

          <p className="switch-text">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <span onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? " Login" : " Sign up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;