const express = require("express");
const router = express.Router();
const {addAffirmation, getRandomAffirmation} = require("../controllers/affirmationController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addAffirmation);
router.get("/random", getRandomAffirmation);

module.exports = router;