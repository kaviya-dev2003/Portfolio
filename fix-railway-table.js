const mysql = require("mysql2/promise");

async function fixTable() {
  console.log("Connecting to Railway MySQL to fix table...");
  
  const pool = mysql.createPool({
    host: "yamanote.proxy.rlwy.net",
    port: 10481,
    user: "root",
    password: "uRbXnNyAUvTvxZIsbPFbaiPgEYIVhRfJ",
    database: "railway",
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    const conn = await pool.getConnection();
    
    // 1. Show current table structure
    console.log("Current table structure:");
    const [tableInfo] = await conn.query("SHOW CREATE TABLE portfolio");
    console.log(tableInfo[0]['Create Table']);
    
    // 2. Check if id has AUTO_INCREMENT
    const [columns] = await conn.query(`
      SELECT COLUMN_NAME, COLUMN_TYPE, EXTRA, IS_NULLABLE 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'railway' 
      AND TABLE_NAME = 'portfolio' 
      AND COLUMN_NAME = 'id'
    `);
    
    console.log("id column info:", columns[0]);
    
    // 3. Fix if needed
    if (!columns[0].EXTRA.includes('auto_increment')) {
      console.log("Fixing AUTO_INCREMENT...");
      
      // Option A: Try to modify the column
      try {
        await conn.query(`
          ALTER TABLE portfolio 
          MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
        `);
        console.log("✅ Modified column with AUTO_INCREMENT");
      } catch (modifyError) {
        console.log("Modify failed, trying DROP and CREATE...");
        
        // Option B: Drop and recreate
        // First, backup data if any
        const [rows] = await conn.query("SELECT * FROM portfolio");
        console.log(`Backing up ${rows.length} rows...`);
        
        // Drop table
        await conn.query("DROP TABLE portfolio");
        
        // Create new table
        await conn.query(`
          CREATE TABLE portfolio (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            socialMedia VARCHAR(255),
            message TEXT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);
        
        console.log("✅ Table recreated with AUTO_INCREMENT");
        
        // Reinsert data if there was any
        if (rows.length > 0) {
          console.log("Reinserting data...");
          for (const row of rows) {
            await conn.query(
              "INSERT INTO portfolio (name, email, socialMedia, message, createdAt) VALUES (?, ?, ?, ?, ?)",
              [row.name, row.email, row.socialMedia, row.message, row.createdAt]
            );
          }
          console.log(`✅ Reinserted ${rows.length} rows`);
        }
      }
    } else {
      console.log("✅ id column already has AUTO_INCREMENT");
    }
    
    // 4. Verify fix
    const [newInfo] = await conn.query("SHOW CREATE TABLE portfolio");
    console.log("New table structure:");
    console.log(newInfo[0]['Create Table']);
    
    conn.release();
    console.log("✅ Table fixed successfully!");
    
  } catch (error) {
    console.error("❌ Fix failed:", error.message);
    console.error("Full error:", error);
  }
  
  process.exit();
}

fixTable();
