const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    duration: {
        type: Number,
        required: true
    },

    audioUrl: {
        type: String,
        required: true
    }
});

const meditationSchema = new mongoose.Schema({
    title: {
        type: String,
        reqired: true
    },

    description: {
        type: String
    },

    type: {
        type: String,
        enum: ["meditation", "music", "breathing"],
        default: "meditation"
    },

    session: [sessionSchema]
});

module.exports = mongoose.model("Meditation", meditationSchema);