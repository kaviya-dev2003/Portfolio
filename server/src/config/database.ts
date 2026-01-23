import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

/**
 * DB CONFIGURATION - ANTIGRAVITY FIX V3
 * This version uses explicit separate calls to createPool to satisfy TypeScript overloads.
 */

// 1. Define the pool variable first
let poolInstance: mysql.Pool;

// Safe Diagnostics (logs only presence/length, not values)
console.log("[Diagnostics] Checking Variables:");
console.log(`- MYSQL_URL: ${process.env.MYSQL_URL ? 'PRESENT (Len: ' + process.env.MYSQL_URL.length + ')' : 'MISSING'}`);
console.log(`- MYSQLHOST: ${process.env.MYSQLHOST || 'MISSING'} (Status: ${process.env.MYSQLHOST === 'MYSQLHOST' ? 'WARNING: LITERAL STRING' : 'OK'})`);

if (process.env.MYSQL_URL && process.env.MYSQL_URL !== "MYSQL_URL") {
  // Use URI string overload
  poolInstance = mysql.createPool(process.env.MYSQL_URL);
} else {
  // Use PoolOptions object overload
  poolInstance = mysql.createPool({
    host: process.env.MYSQLHOST || process.env.DB_HOST || "localhost",
    user: process.env.MYSQLUSER || process.env.DB_USER || "root",
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || "",
    database: process.env.MYSQLDATABASE || process.env.DB_NAME || "portfolio",
    port: parseInt(process.env.MYSQLPORT || "3306"),
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
