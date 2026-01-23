const http = require("http");

const PORT = 5000;

console.log("🚀 Starting RAW HTTP Server (No Express)");

const server = http.createServer((req, res) => {
  console.log(`\n📨 ${req.method} ${req.url}`);
  
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  // Handle OPTIONS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Collect request body
  let body = "";
  req.on("data", chunk => {
    body += chunk.toString();
  });
  
  req.on("end", () => {
    console.log("Body received:", body || "(empty)");
    
    if (req.url === "/api/form/submit" && req.method === "POST") {
      try {
        const data = body ? JSON.parse(body) : {};
        console.log("✅ Parsed JSON:", data);
        
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ 
          success: true, 
          message: "Received by raw server",
          data: data 
        }));
        
      } catch (error) {
        console.log("❌ JSON parse error:", error.message);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ 
          success: false, 
          error: "Invalid JSON: " + error.message 
        }));
      }
    } else if (req.url === "/api/health" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok", server: "raw http" }));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not found" }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`✅ Raw HTTP server running on port ${PORT}`);
  console.log(`📤 Test: curl -X POST http://localhost:${PORT}/api/form/submit -H "Content-Type: application/json" -d '{"test":"data"}'`);
});
