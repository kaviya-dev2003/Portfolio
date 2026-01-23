const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// MySQL connection to Railway
const pool = mysql.createPool({
  host: "yamanote.proxy.rlwy.net",
  port: 10481,
  user: "root",
  password: "uRbXnNyAUvTvxZIsbPFbaiPgEYIVhRfJ",
  database: "railway",
  ssl: { rejectUnauthorized: false },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 30000
});

// Health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Database health check
app.get("/api/health-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() as time, DATABASE() as db, VERSION() as version");
    res.json({ 
      status: "healthy", 
      db: "connected",
      time: rows[0].time,
      database: rows[0].db,
      version: rows[0].version
    });
  } catch (error) {
    res.status(500).json({ 
      status: "error", 
      message: error.message 
    });
  }
});

// Form submission endpoint
app.post("/api/form/submit", async (req, res) => {
  console.log("Form submission received:", req.body.email);
  
  try {
    const { name, email, socialMedia, message } = req.body;
    
    const [result] = await pool.query(
      "INSERT INTO portfolio (name, email, socialMedia, message) VALUES (?, ?, ?, ?)",
      [name, email, socialMedia || null, message]
    );
    
    console.log("Form saved with ID:", result.insertId);
    
    res.json({ 
      success: true, 
      message: "Form submitted successfully",
      id: result.insertId 
    });
    
  } catch (error) {
    console.error("Form submission error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Create table if not exists
async function initializeDB() {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS portfolio (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        socialMedia VARCHAR(255),
        message TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Database table ready");
    
    // Test insert
    const [rows] = await connection.query("SELECT COUNT(*) as count FROM portfolio");
    console.log(`   Total entries: ${rows[0].count}`);
    
    connection.release();
  } catch (error) {
    console.error("❌ Database initialization failed:", error.message);
  }
}

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/api/health`);
  console.log(`📊 DB Health: http://localhost:${PORT}/api/health-db`);
  console.log(`📤 Form endpoint: http://localhost:${PORT}/api/form/submit`);
  
  await initializeDB();
});
