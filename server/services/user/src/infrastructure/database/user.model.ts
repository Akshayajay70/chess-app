import { model } from "mongoose";
import { UserSchema } from "./user.schema";

export const UserModel = model("User", UserSchema);