import { Request, Response } from "express";
import { createFormEntry } from "../services/form.service";
import { CreateFormDto } from "../dtos/form.dto";

export const handleFormSubmission = async (req: Request, res: Response) => {
  try {
    const formData: CreateFormDto = req.body;
    const savedData = await createFormEntry(formData);
    res
      .status(201)
      .json({ message: "Form submitted successfully", data: savedData });
  } catch (error) {
    res.status(500).json({ message: "Error submitting form", error });
  }
};
