const express = require("express");
const app = express();
const PORT = 5000;

console.log("DEBUG SERVER STARTING...");

// Log all requests
app.use((req, res, next) => {
  console.log("");
  console.log("=== NEW REQUEST ===");
  console.log("Time:", new Date().toISOString());
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Content-Type:", req.headers["content-type"]);
  
  let bodyData = "";
  req.on("data", (chunk) => {
    bodyData += chunk.toString();
  });
  
  req.on("end", () => {
    console.log("Body received (length):", bodyData.length);
    if (bodyData) {
      console.log("Body content:", bodyData);
      try {
        JSON.parse(bodyData);
        console.log("✅ Valid JSON");
      } catch (e) {
        console.log("❌ Invalid JSON. Error:", e.message);
      }
    } else {
      console.log("⚠️  Empty body");
    }
    console.log("=== END REQUEST ===");
  });
  
  next();
});

// Handle preflight OPTIONS
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(200);
});

// Test endpoint
app.post("/api/form/submit", (req, res) => {
  console.log("✅ POST to /api/form/submit processed");
  res.json({ success: true, received: "yes" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Debug server running on port ${PORT}`);
});
