const http = require("http");
const PORT = 5002; // Different port

console.log("🔄 Echo Server on port", PORT);

const server = http.createServer((req, res) => {
  console.log(`\n=== ${req.method} ${req.url} ===`);
  console.log("Headers:", req.headers);
  
  let rawData = "";
  req.on("data", chunk => {
    const chunkStr = chunk.toString();
    rawData += chunkStr;
    console.log("RAW HEX:", Buffer.from(chunkStr).toString("hex").substring(0, 100));
    console.log("RAW CHAR:", chunkStr.substring(0, 100));
  });
  
  req.on("end", () => {
    console.log("Complete body (hex):", Buffer.from(rawData).toString("hex"));
    console.log("Complete body (text):", rawData);
    console.log("Body length:", rawData.length);
    
    res.writeHead(200, { 
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*" 
    });
    res.end(JSON.stringify({ 
      received: rawData,
      length: rawData.length,
      hex: Buffer.from(rawData).toString("hex").substring(0, 100)
    }));
  });
});

server.listen(PORT, () => {
  console.log(`✅ Echo server: http://localhost:${PORT}`);
});
