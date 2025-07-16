import { model } from "mongoose";
import { AdminDoc, AdminSchema } from "./admin.schema";

export const AdminModel = model<AdminDoc>("Admin", AdminSchema);