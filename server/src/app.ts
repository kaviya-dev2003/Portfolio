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

// ✅ API routes
app.use("/api/form", formRoutes);

// ✅ React build serve (PRODUCTION)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../client/build/index.html")
    );
  });
}

export default app;
