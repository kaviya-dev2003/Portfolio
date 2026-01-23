const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

// ✅ CONNECT TO RAILWAY MYSQL
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
    const [rows] = await pool.query("SELECT DATABASE() as db, VERSION() as version, NOW() as time");
    res.json({
      status: "healthy",
      database: {
        name: rows[0].db,
        version: rows[0].version,
        time: rows[0].time
      }
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
  console.log("📨 Form submission received from:", req.body.email);
  
  try {
    const { name, email, socialMedia, message } = req.body;
    
    // Validate
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required"
      });
    }
    
    // Get connection
    const connection = await pool.getConnection();
    
    // Fix: Use explicit column names except id
    const [result] = await connection.query(
      "INSERT INTO portfolio (name, email, socialMedia, message) VALUES (?, ?, ?, ?)",
      [name, email, socialMedia || null, message]
    );
    
    connection.release();
    
    console.log("✅ Form saved to Railway MySQL! ID:", result.insertId);
    
    res.json({
      success: true,
      message: "Form submitted successfully",
      id: result.insertId
    });
    
  } catch (error) {
    console.error("❌ Form submission error:", error.message);
    console.error("Error code:", error.code);
    console.error("Error SQL:", error.sql);
    
    // If it's an id AUTO_INCREMENT error, fix the table
    if (error.message.includes("Field '\`id\`' doesn't have a default value") || 
        error.message.includes("id doesn't have a default value")) {
      console.log("Attempting to fix table structure...");
      await fixIdAutoIncrement();
      
      // Try submission again
      return res.status(500).json({
        success: false,
        message: "Table structure fixed, please try submitting again"
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Failed to submit form to Railway database",
      error: error.message
    });
  }
});

// Function to fix AUTO_INCREMENT issue
async function fixIdAutoIncrement() {
  try {
    const connection = await pool.getConnection();
    
    // Check and fix table structure
    const [columns] = await connection.query(`
      SELECT COLUMN_NAME, COLUMN_TYPE, EXTRA 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'railway' 
      AND TABLE_NAME = 'portfolio' 
      AND COLUMN_NAME = 'id'
    `);
    
    if (columns.length > 0 && !columns[0].EXTRA.includes('auto_increment')) {
      console.log("Fixing AUTO_INCREMENT on id column...");
      
      // Drop and recreate table
      await connection.query("DROP TABLE IF EXISTS portfolio");
      
      await connection.query(`
        CREATE TABLE portfolio (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          socialMedia VARCHAR(255),
          message TEXT NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      console.log("✅ Table recreated with proper AUTO_INCREMENT");
    }
    
    connection.release();
  } catch (fixError) {
    console.error("Failed to fix table:", fixError.message);
  }
}

// Initialize database
// In your initializeDB function:
async function initializeDB() {
  try {
    const connection = await pool.getConnection();
    
    // Always drop and recreate to ensure correct structure
    await connection.query("DROP TABLE IF EXISTS portfolio");
    
    await connection.query(`
      CREATE TABLE portfolio (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        socialMedia VARCHAR(255),
        message TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log("✅ Fresh table created with AUTO_INCREMENT");
    
    connection.release();
  } catch (error) {
    console.error("Database init error:", error.message);
  }
}

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/api/health`);
  console.log(`📊 DB Health: http://localhost:${PORT}/api/health-db`);
  
  await initializeDB();
});

// Handle errors
process.on("uncaughtException", (error) => {
  console.error("💥 Uncaught Exception:", error.message);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("💥 Unhandled Rejection at:", promise, "reason:", reason);
});
