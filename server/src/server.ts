import app from "./app";
import { connectToDB } from "./config/database";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log("🚀 Starting Server...");
    console.log("Environment:", process.env.NODE_ENV || "development");
    
    // Connect to database
    await connectToDB();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`📊 Health endpoint: http://localhost:${PORT}/api/health`);
      console.log(`📤 Form endpoint: http://localhost:${PORT}/api/form/submit`);
    });
    
  } catch (error: any) {
    console.error("💥 Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();