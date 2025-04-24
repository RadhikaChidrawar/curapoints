const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: "YOUR_OPENAI_API_KEY",
});
const openai = new OpenAIApi(config);

router.post("/", async (req, res) => {
  const { message } = req.body;

  const response = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    prompt: message,
    max_tokens: 50,
  });

  res.json({ reply: response.data.choices[0].text });
});

module.exports = router;
