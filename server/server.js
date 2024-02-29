const { OpenAI } = require("openai");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.OPENAI_API_KEY)
  throw new Error("OpenAI API key is missing or invalid");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

const systemMessage = {
  role: "system",
  content:
    "Speak like an old fortune teller, first generate a title and then explain the meaning of the dream and make the explanation within 100 words",
};

app.post("/generate-text", async (req, res) => {
  const userContent = req.body.content;

  const prompt = {
    model: "gpt-3.5-turbo",
    messages: [systemMessage, { role: "user", content: userContent }],
    temperature: 0.7,
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    });

    if (!response.ok) {
      throw new Error(`Error in response from OpenAI: ${response.statusText}`);
    }

    const data = await response.json();

    res.json({
      reply: data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error fetching OpenAI API:", error);
    res.status(500).send("Error generating text");
  }
});

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`server starts on ${PORT}`);
});
