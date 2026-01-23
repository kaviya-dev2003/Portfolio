import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import formRoute from "./routes/form.route";
import path from "path";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ 
    status: "ok", 
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ✅ API routes
app.use("/api/form", formRoute);

// ✅ Serve React app in production
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../../client/build");
  app.use(express.static(buildPath));
  
  // All other routes go to React app
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

export default app;