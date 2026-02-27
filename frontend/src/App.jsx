import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Mood from "./pages/mood";
import Home from "./pages/home";
import ProtectedRoute from "./components/protectedRoute";
import MoodCalendar from "./pages/moodCalendar";
import Affirmation from "./pages/affirmation";
import AddAffirmation from "./pages/addaffirmation";
import Meditation from "./pages/meditation";
import Luma from "./pages/luma";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="315092780110-6nlmm560vqbej5keaq8tpusji6cdc6m7.apps.googleusercontent.com">
    <BrowserRouter>
      {}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/mood"
          element={
            <ProtectedRoute>
              <Mood />
            </ProtectedRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/calendar" element={<MoodCalendar />} />
        <Route path="/affirmation" element={<Affirmation />} />
        <Route path="/add-affirmation" element={<AddAffirmation />} />
        <Route path="/meditation" element={<Meditation />} />

        <Route
          path="/luma"
          element={
            <ProtectedRoute>
              <Luma />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;

