console.log("Test 1: Server starting...");

const express = require("express");
console.log("Test 2: Express loaded");

const mysql = require("mysql2/promise");
console.log("Test 3: MySQL loaded");

const app = express();
console.log("Test 4: Express app created");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("Test 5: Server listening on port 5000");
});

console.log("Test 6: End of file");