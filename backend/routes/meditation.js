const express = require("express");
const router = express.Router();
const {addMeditation, getMeditations} = require("../controllers/meditationController");

router.post("/", addMeditation);
router.get("/", getMeditations);

module.exports = router;