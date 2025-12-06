import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import formRoutes from "./routes/form.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/form", formRoutes);

export default app;
