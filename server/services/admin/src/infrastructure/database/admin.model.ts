import { model } from "mongoose";
import { AdminDoc, AdminSchema } from "./admin.schema.ts";

export const AdminModel = model<AdminDoc>("Admin", AdminSchema);