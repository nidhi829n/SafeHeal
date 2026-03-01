const Mood = require("../models/mood");

exports.addMood = async (req, res) => {
  try {
    const { mood, note, date } = req.body;

    // Update if mood already exists for that date
    const existingMood = await Mood.findOne({
      userId: req.user.id,
      date,
    });

    if (existingMood) {
      existingMood.mood = mood;
      existingMood.note = note;
      await existingMood.save();
      return res.json({ message: "Mood updated successfully" });
    }

    const newMood = new Mood({
      userId: req.user.id,
      mood,
      note,
      date,
    });

    await newMood.save();

    res.status(201).json({ message: "Mood saved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
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