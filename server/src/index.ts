const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg"); // Changed from mysql2 to pg (PostgreSQL)
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;
const HOST = '0.0.0.0';

// Middleware
app.use(cors());
app.use(express.json());

let pool = null;

const initDB = async () => {
    try {
        // Use Render's PostgreSQL connection string
        const connectionString = process.env.DATABASE_URL;
        
        if (connectionString) {
            pool = new Pool({
                connectionString: connectionString,
                ssl: {
                    rejectUnauthorized: false // Required for Render PostgreSQL
                }
            });
            
            // Test connection and create table
            const client = await pool.connect();
            await client.query(`
                CREATE TABLE IF NOT EXISTS portfolio (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    socialMedia VARCHAR(255),
                    message TEXT NOT NULL,
                    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
            client.release();
            console.log("✅ PostgreSQL database initialized successfully");
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
    res.status(200).json({ 
        status: "ok", 
        db: pool ? "connected" : "mock",
        mode: process.env.NODE_ENV || "development"
    });
});

// Form Submission
app.post("/api/form/submit", async (req, res) => {
    const { name, email, socialMedia, message } = req.body;
    
    console.log(`📩 Form submission received: ${email}`);

    try {
        if (pool) {
            await pool.query(
                "INSERT INTO portfolio (name, email, socialMedia, message) VALUES ($1, $2, $3, $4)",
                [name, email, socialMedia || null, message]
            );
            res.status(201).json({ 
                success: true, 
                message: "Form submitted and saved to PostgreSQL database",
                mode: "database"
            });
        } else {
            console.log("📝 Mock save (no DB):", { name, email, message });
            res.status(201).json({ 
                success: true, 
                message: "Form submitted successfully (mock mode)",
                mode: "mock"
            });
        }
    } catch (error) {
        console.error("❌ Form submission error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error", 
            error: error.message 
        });
    }
});

// Get all submissions (for testing)
app.get("/api/submissions", async (req, res) => {
    try {
        if (pool) {
            const result = await pool.query("SELECT * FROM portfolio ORDER BY createdAt DESC");
            res.json({ 
                success: true, 
                submissions: result.rows,
                count: result.rowCount
            });
        } else {
            res.json({ 
                success: true, 
                message: "Running in mock mode - no database",
                submissions: [],
                mode: "mock"
            });
        }
    } catch (error) {
        console.error("❌ Error fetching submissions:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Error fetching submissions",
            error: error.message 
        });
    }
});

// Serve React App
const buildPath = path.join(__dirname, "../../client/build");
app.use(express.static(buildPath));
app.get("/api/test", (req, res) => {
    res.json({ message: "API is working", timestamp: new Date().toISOString() });
});
app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
});

// Start Server
app.listen(PORT, HOST, async () => {
    await initDB();
    console.log(`🚀 Server running on http://${HOST}:${PORT}`);
});