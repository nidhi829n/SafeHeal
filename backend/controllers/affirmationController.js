const Affirmation = require("../models/affirmation");

exports.addAffirmation = async (req, res) =>{
    try{
        const {text} = req.body;

        const affirmation = new Affirmation({text});
        await affirmation.save();

        res.status(201).json({message: "Affirmation added successfully"});
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.getRandomAffirmation = async (req, res) =>{
    try{
        const count = await Affirmation.countDocuments();
        const random = Math.floor(Math.random()* count);

        const affirmation = await Affirmation.findOne().skip(random);

        res.json(affirmation);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};