const http = require("http");
const mysql = require("mysql2/promise");

const PORT = 5001;

console.log("🚀 Starting MySQL Server on port", PORT);

// Railway MySQL
const pool = mysql.createPool({
  host: "yamanote.proxy.rlwy.net",
  port: 10481,
  user: "root",
  password: "uRbXnNyAUvTvxZIsbPFbaiPgEYIVhRfJ",
  database: "railway",
  ssl: { rejectUnauthorized: false }
});

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");
  
  // Handle OPTIONS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }
  
  let body = "";
  req.on("data", chunk => body += chunk.toString());
  
  req.on("end", async () => {
    console.log(`${req.method} ${req.url} - Body: ${body.substring(0, 100)}...`);
    
    try {
      if (req.url === "/api/form/submit" && req.method === "POST") {
        if (!body) throw new Error("Empty request");
        
        const data = JSON.parse(body);
        
        // Save to Railway
        const [result] = await pool.query(
          "INSERT INTO portfolio (name, email, socialMedia, message) VALUES (?, ?, ?, ?)",
          [data.name, data.email, data.socialMedia || null, data.message]
        );
        
        console.log("✅ Saved, ID:", result.insertId);
        
        res.writeHead(200);
        res.end(JSON.stringify({
          success: true,
          message: "Saved to Railway MySQL",
          id: result.insertId
        }));
        
      } else if (req.url === "/api/health") {
        res.writeHead(200);
        res.end(JSON.stringify({ status: "ok", port: PORT }));
        
      } else if (req.url === "/api/health-db") {
        const [rows] = await pool.query("SELECT DATABASE() as db");
        res.writeHead(200);
        res.end(JSON.stringify({
          status: "healthy",
          database: rows[0].db
        }));
        
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Not found" }));
      }
      
    } catch (error) {
      console.error("❌ Error:", error.message);
      res.writeHead(500);
      res.end(JSON.stringify({
        success: false,
        error: error.message
      }));
    }
  });
});

server.listen(PORT, async () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  
  // Test MySQL
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query("SELECT DATABASE() as db, VERSION() as version");
    console.log(`✅ Connected to ${rows[0].db} (${rows[0].version})`);
    conn.release();
  } catch (error) {
    console.error("❌ MySQL failed:", error.message);
  }
});
