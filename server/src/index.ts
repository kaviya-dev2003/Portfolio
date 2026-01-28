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

const initDB = async (): Promise<void> => {
    try {
        if (process.env.MYSQL_URL || process.env.MYSQLHOST) {
            let config: any;
            
            if (process.env.MYSQL_URL) {
                // Parse MYSQL_URL
                const url = new URL(process.env.MYSQL_URL as string);
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
                    host: process.env.MYSQLHOST as string,
                    user: process.env.MYSQLUSER as string,
                    password: process.env.MYSQLPASSWORD as string,
                    database: process.env.MYSQLDATABASE as string,
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
    } catch (error: any) {
        console.error("❌ Database initialization failed:", error.message);
        pool = null;
    }
};

// Health Check
app.get("/api/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok", db: pool ? "connected" : "mock" });
});

// Form Submission
app.post("/api/form/submit", async (req: Request, res: Response) => {
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
const buildPath = path.join(__dirname, "../../client/build");

console.log(`🛠️ Mode: ${process.env.NODE_ENV || "not set"}`);
console.log(`📂 Checking build path: ${buildPath}`);

// Serve static files from React build
app.use(express.static(buildPath));

// API routes
app.get("/api/test", (req: Request, res: Response) => {
    res.json({ message: "API is working" });
});

// All other routes go to React app
app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(buildPath, "index.html"));
});

// Start Server
app.listen(PORT, async () => {
    await initDB();
    console.log(`🚀 Server running on port ${PORT}`);
});