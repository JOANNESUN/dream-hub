const { OpenAI } = require("openai");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const database = require("./database");
const { formatDate } = require("./dateConverter");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const authenticateToken = require("./authenticationToken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.OPENAI_API_KEY)
  throw new Error("OpenAI API key is missing or invalid");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/test", (req, res) => {
  res.status(200).send("Test route is working");
});

app.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully", success: true });
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
    INSERT INTO user (username, email, password, createdAt, updatedAt)
    VALUES (?, ?, ?, NOW(), NOW())
  `;

    const [results] = await database.query(query, [
      name,
      email,
      hashedPassword,
    ]);
    res.status(201).send({
      message: "Signup successful",
      userId: results.insertId,
      username: results.name,
    });
  } catch (error) {
    console.error("Failed to insert user in database", error);
    res.status(500).send("Error signing up");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await database.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    const user = rows[0];
    // No user found with that email
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user.id }, jwtSecret);
      res.json({
        message: "Login successful",
        token: token,
        username: user.username,
      });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/googlelogin", async (req, res) => {
  console.log("Received /googlelogin request with body:", req.body);
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"]; // User's Google ID
    const { email, name } = payload;
    let [user] = await database.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    if (!user.length) {
      // User does not exist, create user
      const query = `
      INSERT INTO user (username, email, password, createdAt, updatedAt)
      VALUES (?, ?, 'registered_via_google', NOW(), NOW())
    `;

      const [results] = await database.query(query, [name, email]);
      user = { id: results.insertId, username: name, email: email };
    } else {
      user = user[0]; // Use existing user
    }

    // Generate a token for the app to use
    const appToken = jwt.sign({ userId: user.id }, jwtSecret);

    res.json({
      message: "Login successful",
      token: appToken,
      username: user.username,
    });
  } catch (error) {
    console.error("Google login failed", error);
    res.status(500).send("Error logging in with Google");
  }
});

app.post("/save-journal", authenticateToken, async (req, res) => {
  const { date, dream, analysis } = req.body;
  const userId = req.user.userId;

  const query = `
    INSERT INTO journal (user_id, date, dream, analysis)
    VALUES (?, ?, ?, ?)
  `;

  try {
    const [results] = await database.query(query, [
      userId,
      date,
      dream,
      analysis,
    ]);
    res
      .status(201)
      .send({ message: "Data saved successfully", id: results.insertId });
  } catch (error) {
    console.error("Failed to insert into database", error);
    res.status(500).send("Error saving data");
  }
});

app.get("/fetch-journal", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const query = "SELECT * FROM journal WHERE user_id = ? ORDER BY id DESC";

    const [results] = await database.query(query, [userId]);
    const formattedResults = results.map((item) => ({
      ...item,
      date: formatDate(item.date),
    }));

    res.status(200).send(formattedResults);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
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
