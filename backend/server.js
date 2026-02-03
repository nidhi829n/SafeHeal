const cors = require("cors");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const moodRoutes = require("./routes/mood");
const meditationRoutes = require("./routes/meditation");
const affirmationRoutes = require("./routes/affirmation");
const aiRoutes = require("./routes/ai");



mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected with DB"))
.catch(err => console.log("DB error:", err));



const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/meditations", meditationRoutes);
app.use("/api/affirmations", affirmationRoutes);
app.use("/api/ai", aiRoutes);

app.listen(3000, (req, res) =>{
    console.log("server is listening on port 3000");
})