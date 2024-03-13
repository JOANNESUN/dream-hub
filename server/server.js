const { OpenAI } = require("openai");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const database = require('./database'); 
const { formatDate } = require('./dateConverter'); 
const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.OPENAI_API_KEY)
  throw new Error("OpenAI API key is missing or invalid");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/test', (req, res) => {
  res.status(200).send('Test route is working');
});

app.get("/fetch-journal", async (req, res) => {
  try {

      const userId = req.query.user_id || 1; // Fallback to 1 if no user_id is specified
      const query = 'SELECT * FROM journal WHERE user_id = ? ORDER BY date DESC';

      // Use async/await for the promise-based query
      const [results] = await database.query(query, [userId]);
      const formattedResults = results.map(item => ({
        ...item,
        date: formatDate(item.date),
      }));

      res.status(200).send(formattedResults);
  } catch (error) {
      res.status(500).send('Error fetching data');
  }
});


app.post ("/save-journal", async(req, res) =>{
  const { user_id, date, dream, analysis } = req.body;
 
    // The SQL query to insert data, adjust column names as per your table
    const query = `
    INSERT INTO journal (user_id, date, dream, analysis)
    VALUES (?, ?, ?, ?)
  `;

    // Using the db.query method to insert data into the journal table
    database.query(query, [user_id, date, dream, analysis], (error, results) => {
      if (error) {
        console.error("Failed to insert into database", error);
        res.status(500).send('Error saving data');
      } else {
        console.log("Data inserted successfully", results);
        res.status(201).send({ message: 'Data saved successfully', id: results.insertId });
      }
    });
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
