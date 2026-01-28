import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql, { Pool, PoolConnection, PoolOptions } from "mysql2/promise";
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
            let config: PoolOptions;
            
            if (process.env.MYSQL_URL) {
                // For MYSQL_URL (Render MySQL), we need to parse the URL
                const url = new URL(process.env.MYSQL_URL);
                config = {
                    host: url.hostname,
                    user: url.username,
                    password: url.password,
                    database: url.pathname.slice(1), // Remove leading '/'
                    port: parseInt(url.port) || 3306,
                    ssl: { rejectUnauthorized: false }
                };
            } else {
                // For individual environment variables
                config = {
                    host: process.env.MYSQLHOST!,
                    user: process.env.MYSQLUSER!,
                    password: process.env.MYSQLPASSWORD!,
                    database: process.env.MYSQLDATABASE!,
                    port: parseInt(process.env.MYSQLPORT || "3306"),
                    ssl: { rejectUnauthorized: false }
                };
            }
            
            pool = mysql.createPool(config);
            
            // Test connection and create table
            const connection: PoolConnection = await pool.getConnection();
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
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error("❌ Database initialization failed:", errorMessage);
        pool = null; // Ensure we use fallback logic
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
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error("❌ Form submission error:", errorMessage);
        res.status(500).json({ success: false, message: "Internal server error", error: errorMessage });
    }
});

// Serve React App in Production
const __dirname = path.resolve();
const buildPath = path.join(__dirname, "client/build");

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
    res.sendFile(path.join(buildPath, "index.html"), (err: Error | null) => {
        if (err) {
            console.error(`❌ Error sending index.html:`, err.message);
            res.status(500).send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Error - Portfolio</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                        .error { color: #e74c3c; }
                    </style>
                </head>
                <body>
                    <h1 class="error">Error Loading Application</h1>
                    <p>The client build folder might not exist or is corrupted.</p>
                </body>
                </html>
            `);
        }
    });
});

// Start Server
app.listen(PORT, async () => {
    await initDB();
    console.log(`🚀 Server running on port ${PORT}`);
});