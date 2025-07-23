import { model } from "mongoose";
import { UserSchema } from "./user.schema.ts";

export const UserModel = model("User", UserSchema);