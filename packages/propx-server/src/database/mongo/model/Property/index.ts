import { IProperty } from "propx-models/types";
import mongoose from "mongoose";

const PropertyScheme = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    updatedAt: {
      type: String,
      default: () => new Date().toISOString(),
    },
    createdAt: {
      type: String,
      default: () => new Date().toISOString(),
    },
  },
  { versionKey: false }
);

export const PropertyModel = mongoose.model<IProperty>(
  "Property",
  PropertyScheme
);
