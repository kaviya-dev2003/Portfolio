const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2/promise");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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
            console.log("✅ Database initialized");
        } else {
            console.warn("⚠️ Running in mock mode");
        }
    } catch (error) {
        console.error("❌ Database init failed:", error.message);
        pool = null;
    }
};

app.get("/api/health", (req, res) => {
    res.json({ status: "ok", db: pool ? "connected" : "mock" });
});

app.post("/api/form/submit", async (req, res) => {
    const { name, email, socialMedia, message } = req.body;
    console.log(`📩 Form: ${email}`);
    try {
        if (pool) {
            await pool.query(
                "INSERT INTO portfolio (name, email, socialMedia, message) VALUES (?, ?, ?, ?)",
                [name, email, socialMedia || null, message]
            );
            res.json({ success: true, message: "Saved to database" });
        } else {
            console.log("📝 Mock save");
            res.json({ success: true, message: "Submitted (mock)" });
        }
    } catch (error) {
        console.error("❌ Error:", error.message);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

const buildPath = path.join(__dirname, "../../client/build");
app.use(express.static(buildPath));
app.get("/api/test", (req, res) => res.json({ message: "API working" }));
app.get("*", (req, res) => res.sendFile(path.join(buildPath, "index.html")));

app.listen(PORT, async () => {
    await initDB();
    console.log(`🚀 Server on port ${PORT}`);
});