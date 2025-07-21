import { model } from "mongoose";
import { IVarient, varientSchema } from "../schema/varient.schema";

export const VarientModel = model<IVarient>('Varient', varientSchema);