import mongoose from "mongoose";

const FormSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    socialMedia: { type: String },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const FormModel = mongoose.model("Form", FormSchema);
