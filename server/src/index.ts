import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql, { Pool } from "mysql2/promise";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Pool Setup (with fallback)
let pool: Pool | null = null;

const initDB = async () => {
    try {
        if (process.env.MYSQL_URL || process.env.MYSQLHOST) {
            const config: any = process.env.MYSQL_URL 
                ? { uri: process.env.MYSQL_URL }
                : {
                    host: process.env.MYSQLHOST,
                    user: process.env.MYSQLUSER,
                    password: process.env.MYSQLPASSWORD,
                    database: process.env.MYSQLDATABASE,
                    port: parseInt(process.env.MYSQLPORT || "3306"),
                };
            
            config.ssl = { rejectUnauthorized: false };
            pool = mysql.createPool(config);
            
            // Test connection and create table
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
    } catch (error: any) {
        console.error("❌ Database initialization failed:", error.message);
        pool = null; // Ensure we use fallback logic
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
    } catch (error: any) {
        console.error("❌ Form submission error:", error.message);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
});

// Serve React App in Production
if (process.env.NODE_ENV === "production") {
    const buildPath = path.join(__dirname, "../../client/build");
    app.use(express.static(buildPath));
    app.get("*", (req, res) => {
        res.sendFile(path.join(buildPath, "index.html"));
    });
}

// Start Server
app.listen(PORT, async () => {
    await initDB();
    console.log(`🚀 Server running on port ${PORT}`);
});
