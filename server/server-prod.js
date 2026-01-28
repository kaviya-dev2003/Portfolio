const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// CORS for production
app.use(cors({
  origin: ["https://portfolio-production-8b1b.up.railway.app", "http://localhost:3000"],
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Parse Railway's MYSQL_URL or use individual variables
function parseMySQLConfig() {
  const url = process.env.MYSQL_URL;
  
  if (url) {
    const match = url.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
    if (match) {
      return {
        host: match[3],
        user: match[1],
        password: match[2],
        port: parseInt(match[4]),
        database: match[5]
      };
    }
  }

  // Fallback to individual Railway variables
  return {
    host: process.env.MYSQLHOST || 'localhost',
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || '',
    port: parseInt(process.env.MYSQLPORT || '3306'),
    database: process.env.MYSQLDATABASE || 'railway'
  };
}

const dbConfig = parseMySQLConfig();

const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});

// Form submission
app.post("/api/form/submit", async (req, res) => {
  console.log("Form submission received:", req.body.email);
  
  try {
    const { name, email, socialMedia, message } = req.body;
    
    // Validate
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required"
      });
    }
    
    const [result] = await pool.query(
      "INSERT INTO portfolio (name, email, socialMedia, message) VALUES (?, ?, ?, ?)",
      [name, email, socialMedia || null, message]
    );
    
    console.log("Saved to Railway, ID:", result.insertId);
    
    res.json({
      success: true,
      message: "Form submitted successfully",
      id: result.insertId
    });
    
  } catch (error) {
    console.error("Database error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to submit form. Please try again."
    });
  }
});

// Serve React app in production
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../client/build");
  app.use(express.static(buildPath));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

// Initialize database
async function initDB() {
  try {
    console.log("🔌 Testing database connection...");
    const conn = await pool.getConnection();
    console.log("✅ Database connection successful!");
    
    await conn.query(`
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
    conn.release();
    return true;
  } catch (error) {
    console.error("❌ Database init error:", error.message);
    console.error("Full error:", error);
    return false;
  }
}

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`📊 Database host: ${dbConfig.host}`);
  console.log(`📊 Database name: ${dbConfig.database}`);
  
  const dbReady = await initDB();
  if (dbReady) {
    console.log("✅ Application ready to accept requests");
  } else {
    console.log("⚠️ Application started but database connection failed");
  }
});
