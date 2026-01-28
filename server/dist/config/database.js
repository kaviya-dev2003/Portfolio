"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = exports.pool = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("🔧 Database Configuration Initializing...");
console.log("==========================================");
const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    MYSQL_URL: process.env.MYSQL_URL ? "***SET***" : "NOT SET",
    MYSQLHOST: process.env.MYSQLHOST,
    MYSQLUSER: process.env.MYSQLUSER,
    MYSQLPASSWORD: process.env.MYSQLPASSWORD ? "***SET***" : "NOT SET",
    MYSQLDATABASE: process.env.MYSQLDATABASE,
    MYSQLPORT: process.env.MYSQLPORT,
};
console.log("Environment Variables Check:");
Object.entries(envVars).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
});
// Determine connection configuration
let connectionConfig;
if (process.env.MYSQL_URL) {
    console.log("📡 Using MYSQL_URL for connection");
    // Parse the URL to extract components
    const url = process.env.MYSQL_URL;
    console.log(`  URL: ${url.replace(/:[^:]*@/, ':*****@')}`); // Hide password
    // For mysql2, we can use the URL directly with ssl options
    connectionConfig = {
        uri: url,
        ssl: {
            rejectUnauthorized: false
        },
        connectTimeout: 30000,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };
}
else if (process.env.MYSQLHOST) {
    console.log("📡 Using individual MySQL variables");
    console.log(`  Host: ${process.env.MYSQLHOST}`);
    connectionConfig = {
        host: process.env.MYSQLHOST,
        user: process.env.MYSQLUSER || "root",
        password: process.env.MYSQLPASSWORD || "",
        database: process.env.MYSQLDATABASE || "railway",
        port: parseInt(process.env.MYSQLPORT || "3306"),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 30000,
        ssl: {
            rejectUnauthorized: false
        }
    };
}
else {
    console.warn("⚠️ No MySQL configuration found, using defaults");
    connectionConfig = {
        host: "localhost",
        user: "root",
        password: "",
        database: "portfolio",
        port: 3306
    };
}
// Create connection pool
exports.pool = promise_1.default.createPool(connectionConfig);
// Test connection on startup
const connectToDB = async (retryCount = 0) => {
    const maxRetries = 3;
    try {
        console.log(`🔌 Attempting MySQL connection (Attempt ${retryCount + 1}/${maxRetries + 1})...`);
        const connection = await exports.pool.getConnection();
        const [dbInfo] = await connection.query("SELECT DATABASE() as current_db, VERSION() as version");
        const info = dbInfo[0];
        console.log("✅ MySQL Connected Successfully!");
        console.log(`   Database: ${info.current_db}`);
        console.log(`   Version: ${info.version}`);
        // Create portfolio table if it doesn't exist
        const createTableSQL = `
      CREATE TABLE IF NOT EXISTS portfolio (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        socialMedia VARCHAR(255),
        message TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;
        await connection.query(createTableSQL);
        console.log("✅ Portfolio table verified");
        connection.release();
    }
    catch (error) {
        console.error(`❌ MySQL Connection Failed (Attempt ${retryCount + 1}):`);
        console.error(`   Error: ${error.message}`);
        if (retryCount < maxRetries) {
            const delay = 2000 * (retryCount + 1);
            console.log(`   Retrying in ${delay / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return (0, exports.connectToDB)(retryCount + 1);
        }
        else {
            console.error("💥 Maximum retries reached. Could not connect to MySQL.");
            throw error;
        }
    }
};
exports.connectToDB = connectToDB;
//# sourceMappingURL=database.js.map