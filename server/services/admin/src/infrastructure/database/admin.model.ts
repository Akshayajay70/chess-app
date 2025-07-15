import { model } from "mongoose";
import { AdminSchema } from "./admin.schema";

export const AdminModel = model("User", AdminSchema);