// Test Railway Database Connection
require("dotenv").config();
const mysql = require("mysql2/promise");

// Parse Railway's MYSQL_URL
function parseMySQLUrl(url) {
  if (!url) {
    console.error("❌ MYSQL_URL environment variable is not set");
    console.log("\nMake sure you have a .env file in the server directory with:");
    console.log("MYSQL_URL=mysql://user:password@host:port/database");
    process.exit(1);
  }
  
  const match = url.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  if (!match) {
    console.error("❌ Invalid MYSQL_URL format");
    console.log("Expected format: mysql://user:password@host:port/database");
    console.log("Got:", url);
    process.exit(1);
  }
  
  return {
    host: match[3],
    user: match[1],
    password: match[2],
    port: parseInt(match[4]),
    database: match[5]
  };
}

async function testConnection() {
  console.log("🔍 Testing Railway MySQL Connection...\n");
  
  try {
    const dbConfig = parseMySQLUrl(process.env.MYSQL_URL);
    
    console.log("📊 Connection Details:");
    console.log(`   Host: ${dbConfig.host}`);
    console.log(`   Port: ${dbConfig.port}`);
    console.log(`   User: ${dbConfig.user}`);
    console.log(`   Database: ${dbConfig.database}`);
    console.log(`   Password: ${"*".repeat(dbConfig.password.length)}\n`);
    
    console.log("🔌 Attempting to connect...");
    
    const pool = mysql.createPool({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      port: dbConfig.port,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    
    const conn = await pool.getConnection();
    console.log("✅ Connection successful!\n");
    
    // Test table creation
    console.log("📝 Creating portfolio table...");
    await conn.query(`
      CREATE TABLE IF NOT EXISTS portfolio (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        socialMedia VARCHAR(255),
        message TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Table created/verified!\n");
    
    // Test insert
    console.log("📝 Testing insert...");
    const [result] = await conn.query(
      "INSERT INTO portfolio (name, email, socialMedia, message) VALUES (?, ?, ?, ?)",
      ["Test User", "test@example.com", "@testuser", "This is a test message from connection test"]
    );
    console.log(`✅ Insert successful! ID: ${result.insertId}\n`);
    
    // Test select
    console.log("📝 Testing select...");
    const [rows] = await conn.query("SELECT * FROM portfolio ORDER BY id DESC LIMIT 5");
    console.log(`✅ Found ${rows.length} records:`);
    rows.forEach(row => {
      console.log(`   - ID ${row.id}: ${row.name} (${row.email})`);
    });
    
    conn.release();
    await pool.end();
    
    console.log("\n✅ All tests passed! Your database connection is working correctly.");
    console.log("🚀 You're ready to deploy to Railway!");
    
  } catch (error) {
    console.error("\n❌ Connection failed!");
    console.error("Error:", error.message);
    console.error("\nFull error details:");
    console.error(error);
    
    console.log("\n🔧 Troubleshooting tips:");
    console.log("1. Check that your MYSQL_URL is correct in .env file");
    console.log("2. Verify the MySQL service is running on Railway");
    console.log("3. Make sure you're using the correct credentials");
    console.log("4. Check if your IP is allowed (Railway usually allows all IPs)");
    
    process.exit(1);
  }
}

testConnection();
