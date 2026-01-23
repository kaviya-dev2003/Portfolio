const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = 5000;

console.log("🚀 Starting Clean Railway Server...");

// Railway MySQL
const pool = mysql.createPool({
  host: "yamanote.proxy.rlwy.net",
  port: 10481,
  user: "root",
  password: "uRbXnNyAUvTvxZIsbPFbaiPgEYIVhRfJ",
  database: "railway",
  ssl: { rejectUnauthorized: false }
});

// SIMPLE ROUTES - NO COMPLEX PATTERNS
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.post("/api/form/submit", async (req, res) => {
  console.log("Form submission:", req.body.email);
  
  try {
    const { name, email, socialMedia, message } = req.body;
    
    const [result] = await pool.query(
      "INSERT INTO portfolio (name, email, socialMedia, message) VALUES (?, ?, ?, ?)",
      [name, email, socialMedia || null, message]
    );
    
    console.log("✅ Saved to Railway, ID:", result.insertId);
    
    res.json({
      success: true,
      message: "Submitted to Railway",
      id: result.insertId
    });
    
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/api/health`);
});
