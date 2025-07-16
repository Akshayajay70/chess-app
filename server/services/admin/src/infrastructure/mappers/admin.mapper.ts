import { AdminResponse } from "../../application/dtos/admin-response";
import { AdminDoc } from "../database/admin.schema";
import { isValidObjectId, Document } from "mongoose";

export class AdminMapper {
    static toResponse(doc: Partial<AdminDoc> | Document<AdminDoc>): AdminResponse {
        // If it's a Mongoose document, convert to plain object
        const admin = (typeof (doc as any).toObject === 'function')
            ? (doc as Document<AdminDoc>).toObject()
            : doc;
        return {
            gameId: admin.gameId!,
            name: admin.name!,
            email: admin.email!,
            status: admin.status!,
            createdAt: new Date(admin.createdAt!),
        };
    }
}

