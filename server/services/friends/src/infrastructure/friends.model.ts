import mongoose from "mongoose";
import { friendSchema } from "./friends.schema.ts";

export const FriendsModel = mongoose.model("Friends", friendSchema);