import app from "./app";
import { connectToDB } from "./config/database";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
  connectToDB().catch(err => {
    console.error("Database connection failed during startup:", err);
  });
});
