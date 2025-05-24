const express = require("express");
const app = express();
const PORT = 3000;

// Middleware: Enable JSON request body parsing
app.use(express.json());

// Basic logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Existing demonstration route (DO NOT MODIFY)
app.get("/", (req, res) => {
  res.send("Express Routing Lab - Home Page");
});

// 🎯 STUDENT TASKS: Add your routes below this line
// ------------------------------------------------

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// TASK 2: User Routes
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

app.get("/users", (req, res) => {
  res.json(users); // Return all users
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id); // 1. Get ID from req.params
  const user = users.find((u) => u.id === id); // 2. Find user in array
  if (user) {
    res.json(user); // 3. Return user
  } else {
    res.status(404).json({ error: "User not found" }); // or 404 if not found
  }
});

// TASK 3: Message Submission
let messageIdCounter = 1;

app.post("/messages", (req, res) => {
  const { text } = req.body; // 1. Get text from req.body

  if (!text) {
    return res.status(400).json({ error: "Text is required" }); // 2. Validate text exists
  }

  const message = {
    id: messageIdCounter++, // Generated ID (number)
    text, // Original text
    status: "received", // status
  };

  res.json(message); // 3. Return JSON
});

// ------------------------------------------------
// END OF STUDENT TASKS

// 🚫 Do not modify below this line
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = { app };
