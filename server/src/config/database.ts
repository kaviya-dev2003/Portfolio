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

// EXTREME DIAGNOSTICS - LOGGED AT STARTUP
console.log("\n" + "=".repeat(50));
console.log("🚀 DATABASE INITIALIZATION STARTUP");
console.log("=".repeat(50));
console.log(`- NODE_ENV: ${process.env.NODE_ENV}`);

// Safe Environment Dump (Keys only)
const allKeys = Object.keys(process.env).sort();
const dbKeys = allKeys.filter(k => /MYSQL|DATABASE|DB_|HOST|PORT/i.test(k));
console.log(`- Database-related Keys Found: ${dbKeys.join(", ") || "NONE!"}`);

const mysqlUrl = getEnv("MYSQL_URL");
const mysqlHost = getEnv("MYSQLHOST") || getEnv("DB_HOST", "MISSING_DB_HOST_IN_RAILWAY");
const mysqlUser = getEnv("MYSQLUSER", getEnv("DB_USER", "root"));
const mysqlDb = getEnv("MYSQLDATABASE", getEnv("DB_NAME", "portfolio"));

console.log(`- Final Host: ${mysqlHost}`);
console.log(`- Final User: ${mysqlUser}`);
console.log(`- Final DB:   ${mysqlDb}`);
console.log(`- MYSQL_URL Presence: ${mysqlUrl ? 'PRESENT (Len: ' + mysqlUrl.length + ')' : 'MISSING'}`);

if (process.env.NODE_ENV === "production") {
  if (mysqlHost === "localhost" || mysqlHost === "127.0.0.1") {
    console.error("\n" + "!".repeat(50));
    console.error("⛔ CRITICAL ERROR: DATABASE HOST IS 'LOCALHOST' IN PRODUCTION!");
    console.error("This means your Railway Environment Variables are NOT LINKED correctly.");
    console.error("Check your Service Variables in the Railway Dashboard.");
    console.error("!".repeat(50) + "\n");
  }
}

console.log("=".repeat(50) + "\n");

if (mysqlUrl) {
  poolInstance = mysql.createPool(mysqlUrl);
} else {
  poolInstance = mysql.createPool({
    host: mysqlHost,
    user: mysqlUser,
    password: getEnv("MYSQLPASSWORD", getEnv("DB_PASSWORD", "")),
    database: mysqlDb,
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
