import { IAdminRepo } from "../../application/interfaces/admin-repo.interface.ts";
import { AdminResponse } from "../../application/dtos/admin-response.ts";
import { SearchResponse } from "../../application/dtos/search-response.ts";
import { AdminModel } from "./admin.model.ts";
import { DatabaseError } from "../../domain/errors/database.error.ts";
import { AdminMapper } from "../mappers/admin.mapper.ts";

export class AdminRepository implements IAdminRepo {

    async saveUser(data: AdminResponse): Promise<boolean> {
        try {
            await AdminModel.create(data);
            return true;
        } catch (error) {
            throw new DatabaseError("CREATE", "Admin", error instanceof Error ? error : undefined);
        }
    }

    async findByGameId(gameId: string): Promise<AdminResponse | null> {
        try {
            const result = await AdminModel.findOne({ gameId });
            return result ? AdminMapper.toResponse(result) : null;
        } catch (error) {
            throw new DatabaseError("READ", "Admin", error instanceof Error ? error : undefined);
        }
    }

    async updateStatus(gameId: string, status: string): Promise<boolean> {
        try {
            const res = await AdminModel.updateOne({ gameId }, { $set: { status } });
            return res.modifiedCount > 0;
        } catch (error) {
            throw new DatabaseError("UPDATE", "Admin", error instanceof Error ? error : undefined);
        }
    }

    async search(
        search: string,
        page: number,
        limit: number,
        sortType: 1 | -1,
        sortDes: string
    ): Promise<SearchResponse> {
        const query = search
            ? {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { gameId: { $regex: search, $options: 'i' } },
                ]
            }
            : {};

        const skip = (page - 1) * limit;

        try {
            const [results, total] = await Promise.all([
                AdminModel.find(query)
                    .sort({ [sortDes]: sortType })
                    .skip(skip)
                    .limit(limit),
                AdminModel.countDocuments(query)
            ]);

            const data = results.map(result => AdminMapper.toResponse(result));

            return {
                users: data,
                total,
                page,
                totalPages: Math.ceil(total / limit)
            };
        } catch (error) {
            throw new DatabaseError("READ", "Admin", error instanceof Error ? error : undefined);
        }
    }
}
