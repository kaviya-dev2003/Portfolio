"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = exports.pool = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * DB CONFIGURATION - ANTIGRAVITY FIX V3
 * This version uses explicit separate calls to createPool to satisfy TypeScript overloads.
 */
// 1. Define the pool variable first
let poolInstance;
if (process.env.MYSQL_URL) {
    // Use URI string overload
    poolInstance = promise_1.default.createPool(process.env.MYSQL_URL);
}
else {
    // Use PoolOptions object overload
    poolInstance = promise_1.default.createPool({
        host: process.env.MYSQLHOST || process.env.DB_HOST || "localhost",
        user: process.env.MYSQLUSER || process.env.DB_USER || "root",
        password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || "",
        database: process.env.MYSQLDATABASE || process.env.DB_NAME || "portfolio",
        port: parseInt(process.env.MYSQLPORT || "3306"),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 10000,
        enableKeepAlive: true,
        keepAliveInitialDelay: 10000,
    });
}
exports.pool = poolInstance;
console.log(`[DB] Initializing pool with: ${process.env.MYSQL_URL ? 'MYSQL_URL' : 'Config Object'}`);
const connectToDB = async () => {
    try {
        const connection = await exports.pool.getConnection();
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
        }
        catch (e) {
            console.log("socialMedia column check/add attempted");
        }
        console.log("Portfolio table verified/created");
        connection.release();
    }
    catch (error) {
        console.error("MySQL connection failed:", error);
    }
};
exports.connectToDB = connectToDB;
