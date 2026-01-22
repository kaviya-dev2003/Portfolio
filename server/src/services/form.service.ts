import { CreateFormDto } from "../dtos/form.dto";
import { FormModel } from "../models/form.model";

export const createFormEntry = async (data: CreateFormDto) => {
  return await FormModel.create(data);
};
