const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Configure body-parser to handle JSON errors better
app.use(bodyParser.json({
  strict: false, // Allow more flexibility
  limit: '10mb',
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf.toString());
    } catch (e) {
      console.error("Invalid JSON received:", buf.toString());
      throw new Error("Invalid JSON");
    }
  }
}));

// Handle CORS properly
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

// Handle preflight OPTIONS requests
app.options("*", cors());

const PORT = 5000;

console.log("🚀 Starting Server with JSON Error Handling...");

// Railway MySQL connection
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
  res.json({ status: "ok", server: "Railway MySQL Server" });
});

// Database health
app.get("/api/health-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT DATABASE() as db, VERSION() as version");
    res.json({ 
      status: "healthy", 
      database: rows[0].db,
      version: rows[0].version 
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Form submission with better error handling
app.post("/api/form/submit", async (req, res) => {
  console.log("📨 Received request at:", new Date().toISOString());
  console.log("Request headers:", req.headers['content-type']);
  
  // Log raw body for debugging
  req.on('data', (chunk) => {
    console.log("Raw body chunk:", chunk.toString());
  });
  
  try {
    console.log("Request body:", JSON.stringify(req.body, null, 2));
    
    const { name, email, socialMedia, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, email, message"
      });
    }
    
    const [result] = await pool.query(
      "INSERT INTO portfolio (name, email, socialMedia, message) VALUES (?, ?, ?, ?)",
      [name, email, socialMedia || null, message]
    );
    
    console.log("✅ Saved to Railway! ID:", result.insertId);
    
    res.json({
      success: true,
      message: "Form submitted successfully",
      id: result.insertId
    });
    
  } catch (error) {
    console.error("❌ Form processing error:", error.message);
    
    // Different error types
    if (error.message === "Invalid JSON") {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON format received"
      });
    }
    
    if (error.message.includes("id doesn't have a default value")) {
      return res.status(500).json({
        success: false,
        message: "Database table needs repair. Please contact administrator."
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error("JSON Parse Error:", err.message);
    return res.status(400).json({
      success: false,
      message: "Bad JSON: " + err.message
    });
  }
  next(err);
});

// Initialize database
async function initDB() {
  try {
    const conn = await pool.getConnection();
    
    // Create table (id already has AUTO_INCREMENT from our fix)
    await conn.query(`
      CREATE TABLE IF NOT EXISTS portfolio (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        socialMedia VARCHAR(255),
        message TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Count entries
    const [rows] = await conn.query("SELECT COUNT(*) as count FROM portfolio");
    console.log(`📊 Railway MySQL has ${rows[0].count} entries`);
    
    conn.release();
  } catch (error) {
    console.error("Database init error:", error.message);
  }
}

// Start server
app.listen(PORT, async () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/api/health`);
  console.log(`📤 Form: POST http://localhost:${PORT}/api/form/submit`);
  
  await initDB();
});

console.log("Server initialized");
