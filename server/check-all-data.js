const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "yamanote.proxy.rlwy.net",
  port: 10481,
  user: "root",
  password: "uRbXnNyAUvTvxZIsbPFbaiPgEYIVhRfJ",
  database: "railway",
  ssl: { rejectUnauthorized: false }
});

async function checkAllData() {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query("SELECT * FROM portfolio ORDER BY id DESC");
    
    console.log("📊 ALL DATA IN RAILWAY MYSQL:");
    console.log("Total entries:", rows.length);
    console.log("\nRecent submissions:");
    
    rows.forEach(row => {
      console.log(`ID: ${row.id} | ${row.name} <${row.email}> | "${row.message.substring(0, 30)}..." | ${row.createdAt}`);
    });
    
    conn.release();
  } catch (error) {
    console.error("Error:", error.message);
  }
  process.exit();
}

checkAllData();
