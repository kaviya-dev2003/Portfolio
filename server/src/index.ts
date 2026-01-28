import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql, { Pool, PoolConnection } from "mysql2/promise";
import path from "path";

// For __dirname in TypeScript with ES modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Pool Setup (with fallback)
let pool: Pool | null = null;

interface DatabaseConfig {
    host?: string;
    user?: string;
    password?: string;
    database?: string;
    port?: number;
    uri?: string;
    ssl?: { rejectUnauthorized: boolean };
}

const initDB = async (): Promise<void> => {
    try {
        if (process.env.MYSQL_URL || process.env.MYSQLHOST) {
            const config: DatabaseConfig = process.env.MYSQL_URL 
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

interface HealthResponse {
    status: string;
    db: string;
}

// Health Check
app.get("/api/health", (req: Request, res: Response<HealthResponse>): void => {
    res.status(200).json({ status: "ok", db: pool ? "connected" : "mock" });
});

interface FormData {
    name: string;
    email: string;
    socialMedia?: string;
    message: string;
}

interface FormResponse {
    success: boolean;
    message: string;
    error?: string;
}

// Form Submission
app.post("/api/form/submit", async (req: Request<{}, {}, FormData>, res: Response<FormResponse>): Promise<void> => {
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
const buildPath = path.join(__dirname, "../../client/build");

console.log(`🛠️ Mode: ${process.env.NODE_ENV || "not set"}`);
console.log(`📂 Checking build path: ${buildPath}`);

// First, try to serve static files
try {
    app.use(express.static(buildPath));
    console.log("✅ Static files middleware registered");
} catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("❌ Error setting up static files:", errorMessage);
}

// API routes should come before the catch-all route
interface TestResponse {
    message: string;
}

app.get("/api/test", (req: Request, res: Response<TestResponse>): void => {
    res.json({ message: "API is working" });
});

interface ApiErrorResponse {
    error: string;
}

// Only serve React app for non-API routes
app.get("*", (req: Request, res: Response, next: NextFunction): void => {
    // Don't handle API routes with React
    if (req.path.startsWith("/api/")) {
        return next(); // Pass to 404 handler
    }
    
    // For all other routes, serve React's index.html
    res.sendFile(path.join(buildPath, "index.html"), (err: Error | null): void => {
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
                    <p>Build path: ${buildPath}</p>
                </body>
                </html>
            `);
        }
    });
});

// 404 handler for API routes
app.use("/api/*", (req: Request, res: Response<ApiErrorResponse>): void => {
    res.status(404).json({ error: "API endpoint not found" });
});

// Start Server
app.listen(PORT, async (): Promise<void> => {
    await initDB();
    console.log(`🚀 Server running on port ${PORT}`);
});