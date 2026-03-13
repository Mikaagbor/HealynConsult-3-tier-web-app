const express = require("express");
const cors = require("cors");
const { Client } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const client = new Client({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "healyn_db",
  port: process.env.DB_PORT || 5432
});

client.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("Database connection error:", err));

// Create table if not exists
client.query(`
  CREATE TABLE IF NOT EXISTS consultations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(20),
    symptoms TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`).catch(err => console.error("Error creating table:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Health Consultation API Running");
});

// Save consultation to database
app.post("/consultation", async (req, res) => {
  const { name, phone, symptoms } = req.body;

  try {
    const result = await client.query(
      "INSERT INTO consultations (name, phone, symptoms) VALUES ($1,$2,$3) RETURNING *",
      [name, phone, symptoms]
    );

    console.log("New consultation saved:", result.rows[0]);

    res.json({
      success: true,
      message: "Consultation request received successfully",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});