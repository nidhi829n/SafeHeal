const Mood = require("../models/mood");

exports.addMood = async (req, res) =>{
    try{
        const {mood, note} = req.body;

        const newMood = new Mood({
            userId: req.user.id,
            mood: mood,
            note: note
        });

        await newMood.save();

        res.status(201).json({message: "Mood saves successfully"});

    }catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.getMoods = async (req, res) =>{
    try{
        const moods = await Mood.find({userId: req.user.id})
        .sort({date: -1});

        res.json(moods);

    }catch(error){
        res.status(500).json({message: error.message});
    }
};