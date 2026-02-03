const { GoogleGenAI } = require("@google/genai");
  

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.chatWithLuma = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const result = await genAI.models.generateContent({
      model: "models/gemini-flash-latest",
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
      systemInstruction: {
        role: "system",
        parts: [
          {
            text: "You are Luma, an empathetic and supportive mental health companion. Be kind, calm, and non-judgmental.",
          },
        ],
      },
    });

    const reply = result.candidates[0].content.parts[0].text;
    res.json({ reply });

  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ message: "AI error", error: error.message });
  }
};
