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

function App() {
  return (
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
  );
}

export default App;

