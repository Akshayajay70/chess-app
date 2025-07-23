import { model } from "mongoose";
import { varientSchema } from "../schema/varient.schema.ts";
import { VariantType } from "../../../application/ports/types/index.ts";

export const VarientModel = model<VariantType>('Varient', varientSchema);