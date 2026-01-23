import { Request, Response } from "express";
import { createFormEntry } from "../services/form.service";
import { CreateFormDto } from "../dtos/form.dto";

export const handleFormSubmission = async (req: Request, res: Response) => {
  const requestId = Math.random().toString(36).substring(7);
  console.log(`[Form] Request ${requestId} received:`, req.body.email);

  try {
    const formData: CreateFormDto = req.body;
    
    // Add a 10-second timeout for the database operation
    const dbPromise = createFormEntry(formData);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Database operation timed out")), 10000)
    );

    console.log(`[Form] Request ${requestId} attempting DB insert...`);
    const savedData = await Promise.race([dbPromise, timeoutPromise]);
    
    console.log(`[Form] Request ${requestId} success!`);
    res
      .status(201)
      .json({ message: "Form submitted successfully", data: savedData });
  } catch (error: any) {
    console.error(`[Form] Request ${requestId} failed:`, error);
    
    if (error.message === "Database operation timed out") {
      res.status(504).json({ message: "Database is taking too long to respond. Please try again later." });
      return;
    }
    
    res.status(500).json({ message: "Error submitting form", error: error.message || "Internal Server Error" });
  }
};
