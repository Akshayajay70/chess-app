import mongoose from "mongoose";
import { friendSchema } from "./friends.schema";

export const FriendsModel = mongoose.model("Friends", friendSchema);