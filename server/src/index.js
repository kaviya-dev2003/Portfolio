const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2/promise");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;  // ← CHANGED TO 10000
const HOST = '0.0.0.0';  // ← ADDED FOR RENDER

// Middleware
app.use(cors());
app.use(express.json());

let pool = null;

const initDB = async () => {
    try {
        if (process.env.MYSQL_URL || process.env.MYSQLHOST) {
            let config;
            
            if (process.env.MYSQL_URL) {
                const url = new URL(process.env.MYSQL_URL);
                config = {
                    host: url.hostname,
                    user: url.username,
                    password: url.password,
                    database: url.pathname.slice(1),
                    port: parseInt(url.port) || 3306,
                    ssl: { rejectUnauthorized: false }
                };
            } else {
                config = {
                    host: process.env.MYSQLHOST,
                    user: process.env.MYSQLUSER,
                    password: process.env.MYSQLPASSWORD,
                    database: process.env.MYSQLDATABASE,
                    port: parseInt(process.env.MYSQLPORT || "3306"),
                    ssl: { rejectUnauthorized: false }
                };
            }
            
            pool = mysql.createPool(config);
            
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
            connection.release();
            console.log("✅ Database initialized successfully");
        } else {
            console.warn("⚠️ No database configuration found. Running in mock mode.");
        }
    } catch (error) {
        console.error("❌ Database initialization failed:", error.message);
        pool = null;
    }
};

// Health Check
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", db: pool ? "connected" : "mock" });
});

// Form Submission
app.post("/api/form/submit", async (req, res) => {
    const { name, email, socialMedia, message } = req.body;
    
    console.log(`📩 Form submission received: ${email}`);

    try {
        if (pool) {
            await pool.query(
                "INSERT INTO portfolio (name, email, socialMedia, message) VALUES (?, ?, ?, ?)",
                [name, email, socialMedia || null, message]
            );
            res.status(201).json({ success: true, message: "Form submitted and saved to database" });
        } else {
            console.log("📝 Mock save (no DB):", { name, email, message });
            res.status(201).json({ success: true, message: "Form submitted successfully (mock mode)" });
        }
    } catch (error) {
        console.error("❌ Form submission error:", error.message);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
});

// Serve React App
const buildPath = path.join(__dirname, "../../client/build");

// Serve static files from React build
app.use(express.static(buildPath));

// API routes
app.get("/api/test", (req, res) => {
    res.json({ message: "API is working" });
});

// All other routes go to React app
app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
});

// Start Server with Render-compatible settings
app.listen(PORT, HOST, async () => {
    await initDB();
    console.log(`🚀 Server running on http://${HOST}:${PORT}`);
});