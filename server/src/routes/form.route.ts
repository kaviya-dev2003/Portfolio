import express from "express";
import { handleFormSubmission } from "../controllers/form.controller";

const router = express.Router();

router.post("/submit", handleFormSubmission);

export default router;