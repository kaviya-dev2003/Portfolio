import { CreateFormDto } from "../dtos/form.dto";
import { FormModel } from "../models/form.model";

export const createFormEntry = async (data: CreateFormDto) => {
  const newEntry = new FormModel(data);
  return await newEntry.save();
};
