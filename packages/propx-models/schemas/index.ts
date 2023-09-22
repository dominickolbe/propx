import { object, string, number, date, InferType } from "yup";

export const propertyBodySchema = object({
  address: string().required().min(10).max(255),
  price: number().required().positive().max(1000000),
});
