import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

/**
 * DB CONFIGURATION - ANTIGRAVITY FIX V3
 * This version uses explicit separate calls to createPool to satisfy TypeScript overloads.
 */

// Helper to safely get env variables (ignores literal placeholders like "MYSQLHOST")
const getEnv = (key: string, fallback: string = ""): string => {
  const value = process.env[key];
  if (!value || value === key || value === "UNDEFINED" || value.startsWith("${{")) return fallback;
  return value;
};

// 1. Define the pool variable first
let poolInstance: mysql.Pool;

// Safe Diagnostics (logs only presence/keys, NOT values)
const envKeys = Object.keys(process.env).filter(k => 
  k.includes("MYSQL") || k.includes("DB_") || k.includes("DATABASE") || k.includes("HOST") || k.includes("PORT")
).join(", ");
console.log("[Diagnostics] Related Env Keys Found:", envKeys || "NONE");

const mysqlUrl = getEnv("MYSQL_URL");
const mysqlHost = getEnv("MYSQLHOST") || getEnv("DB_HOST", "localhost");

if (process.env.NODE_ENV === "production" && mysqlHost === "localhost") {
  console.error("[CRITICAL] Database host is 'localhost' in production! Environment variables are likely MISSING.");
}

console.log(`[Diagnostics] Final Host: ${mysqlHost}`);
console.log(`- MYSQL_URL Status: ${mysqlUrl ? 'PRESENT (Len: ' + mysqlUrl.length + ')' : 'MISSING'}`);

if (mysqlUrl) {
  poolInstance = mysql.createPool(mysqlUrl);
} else {
  poolInstance = mysql.createPool({
    host: mysqlHost,
    user: getEnv("MYSQLUSER", getEnv("DB_USER", "root")),
    password: getEnv("MYSQLPASSWORD", getEnv("DB_PASSWORD", "")),
    database: getEnv("MYSQLDATABASE", getEnv("DB_NAME", "portfolio")),
    port: parseInt(getEnv("MYSQLPORT", "3306")),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 20000, 
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
  });
}

export const pool = poolInstance;

console.log(`[DB] Initializing pool with: ${process.env.MYSQL_URL ? 'MYSQL_URL' : 'Config Object'}`);

export const connectToDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL Connected Successfully");

    // Automatically create table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS portfolio (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        socialMedia VARCHAR(255),
        message TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    await connection.query(createTableQuery);

    // Ensure socialMedia column exists (for older tables)
    try {
      await connection.query("ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS socialMedia VARCHAR(255) AFTER email");
    } catch (e) {
      console.log("socialMedia column check/add attempted");
    }

    console.log("Portfolio table verified/created");

    connection.release();
  } catch (error) {
    console.error("MySQL connection failed:", error);
  }
};
