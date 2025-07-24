import { model } from "mongoose";
import { ratingSchema } from "../schemas/ratings.schema.ts";
import { IRating } from "../../../application/ports/types/index.ts";

export const RatingModel = model<IRating>('Rating', ratingSchema)