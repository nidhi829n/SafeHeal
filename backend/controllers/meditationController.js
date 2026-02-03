const Meditation = require("../models/meditation");

exports.addMeditation = async(req , res) =>{
    try{
        const {title, description, type, sessions} = req.body;

        const meditation = new Meditation({
            title,
            description,
            type,
            sessions
        });

        await meditation.save();
        res.status(201).json({message: "Meditation added successfully" });
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.getMeditations = async (req, res) =>{
    try{
        const meditations = await Meditation.find();
        res.json(meditations);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};