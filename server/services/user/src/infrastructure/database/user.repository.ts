import { UserResponse } from "../../application/dto/user-response.ts";
import { IUserRespository } from "../../application/interfaces/user-repo.interface.ts";
import { UserEntity } from "../../domain/entities/user.entitie.ts";
import { UserMapper } from "../mapper/user-mapper.ts";
import { UserModel } from "./user.model.ts";
import { DatabaseError } from "../../domain/errors/database.error.ts";

export class UserRepository implements IUserRespository {
    async create(user: UserEntity): Promise<UserResponse> {
        try {
            const data = UserMapper.toDatabase(user);

            const createdUser = await UserModel.create(data);
            return UserMapper.toDomain({
                ...createdUser.toObject(),
                _id: createdUser._id.toString()
            })
        } catch (error) {
            throw new DatabaseError(
                "CREATE",
                "User",
                error instanceof Error ? error : new Error("Failed to create user")
            );

        }
    }
    async findByEmail(email: string): Promise<UserResponse | null> {
        try {
            const user = await UserModel.find({ email });
            return user.length ? UserMapper.toDomain({
                ...user[0].toObject(),
                _id: user[0]._id.toString()
            }) : null

        } catch (error) {
            throw new DatabaseError(
                "READ",
                "User",
                error instanceof Error ? error : new Error("Failed to read user")
            );
        }
    }
    async findByGameId(gameId: string): Promise<UserResponse | null> {
        try {
            const user = await UserModel.find({ gameId });
            return user.length ? UserMapper.toDomain({
                ...user[0].toObject(),
                _id: user[0]._id.toString()
            }) : null

        } catch (error) {
            throw new DatabaseError(
                "READ",
                "User",
                error instanceof Error ? error : new Error("Failed to read user")
            );
        }
    }
    async updateName(email: string, name: string): Promise<boolean> {
        try {
            const result = await UserModel.updateOne({ email }, { $set: { name } });
            return result.modifiedCount > 0;
        } catch (error) {
            throw new DatabaseError(
                "UPDATE",
                "User",
                error instanceof Error ? error : new Error("Failed to update user")
            );
        }
    }

    async updateStatus(gameId: string, status: string): Promise<boolean> {
        try {
            const result = await UserModel.updateOne({ gameId }, { $set: { status } });
            return result.modifiedCount > 0;
        } catch (error) {
            throw new DatabaseError(
                "UPDATE",
                "status",
                error instanceof Error ? error : new Error("Failed to update user status")
            );
        }
    }
}