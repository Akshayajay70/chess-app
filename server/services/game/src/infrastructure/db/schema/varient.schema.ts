import { variants, IVariantSchema } from '../../../application/ports/types/index'
import { Schema } from "mongoose";

export const varientSchema = new Schema<IVariantSchema>(
  {
    varientName: {
      type: String,
      enum: variants,
      required: true
    },
    timeBase: {
      type: Number,
      required: true
    },
    timeInc: {
      type: Number,
      required: true
    }
  }
);

