import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import formRoutes from "./routes/form.route";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ✅ Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// ✅ API routes
app.use("/api/form", formRoutes);

// ✅ React build serve (PRODUCTION)
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../../client/build");
  app.use(express.static(buildPath));

  app.get("*splat", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

export default app;
