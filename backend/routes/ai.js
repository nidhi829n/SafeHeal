const express = require("express");
const router = express.Router();
const {chatWithLuma} = require("../controllers/aiController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/chat", authMiddleware, chatWithLuma);

module.exports = router;