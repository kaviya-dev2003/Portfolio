const mysql = require("mysql2/promise");

console.log("🚀 Starting Railway MySQL Table Fix...");

async function fixTable() {
  // Railway MySQL connection
  const pool = mysql.createPool({
    host: "yamanote.proxy.rlwy.net",
    port: 10481,
    user: "root",
    password: "uRbXnNyAUvTvxZIsbPFbaiPgEYIVhRfJ",
    database: "railway",
    ssl: { rejectUnauthorized: false },
    connectTimeout: 10000
  });

  try {
    console.log("1. Connecting to Railway MySQL...");
    const connection = await pool.getConnection();
    
    console.log("2. Checking current table...");
    
    // Check if table exists
    const [tables] = await connection.query("SHOW TABLES LIKE 'portfolio'");
    
    if (tables.length === 0) {
      console.log("   Table doesn't exist, creating fresh...");
      await connection.query(`
        CREATE TABLE portfolio (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          socialMedia VARCHAR(255),
          message TEXT NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log("   ✅ Fresh table created");
    } else {
      console.log("   Table exists, checking structure...");
      
      // Get table info
      const [createTable] = await connection.query("SHOW CREATE TABLE portfolio");
      console.log("   Current structure:");
      console.log(createTable[0]['Create Table']);
      
      // Simple fix: Drop and recreate
      console.log("3. Dropping old table...");
      await connection.query("DROP TABLE portfolio");
      
      console.log("4. Creating new table with AUTO_INCREMENT...");
      await connection.query(`
        CREATE TABLE portfolio (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          socialMedia VARCHAR(255),
          message TEXT NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log("   ✅ New table created");
    }
    
    // Test the fix
    console.log("5. Testing AUTO_INCREMENT...");
    const [testResult] = await connection.query(
      "INSERT INTO portfolio (name, email, message) VALUES (?, ?, ?)",
      ["Fix Test", "fix@test.com", "Testing AUTO_INCREMENT"]
    );
    
    console.log(`   ✅ Test insert successful! ID: ${testResult.insertId}`);
    
    // Show final structure
    const [finalTable] = await connection.query("SHOW CREATE TABLE portfolio");
    console.log("6. Final table structure:");
    console.log(finalTable[0]['Create Table']);
    
    connection.release();
    
    console.log("\n🎉 SUCCESS! Railway table is now fixed!");
    console.log("The 'id' column now has AUTO_INCREMENT.");
    
  } catch (error) {
    console.error("\n❌ ERROR:", error.message);
    console.error("Error code:", error.code);
    console.error("SQL State:", error.sqlState);
    
    if (error.message.includes("ER_ACCESS_DENIED_ERROR")) {
      console.log("\n⚠️  Check your Railway credentials:");
      console.log("Host: yamanote.proxy.rlwy.net");
      console.log("Port: 10481");
      console.log("User: root");
      console.log("Database: railway");
    }
  }
  
  console.log("\nDone.");
  process.exit();
}

fixTable();
