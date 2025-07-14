import { UserResponse } from "../../application/dto/user-response";
import { IUserRespository } from "../../application/interfaces/user-repo.interface";
import { UserEntity } from "../../domain/entities/user.entitie";
import { UserMapper } from "../mapper/user-mapper";
import { UserModel } from "./user.model";
import { DatabaseError } from "../../domain/errors/database.error";

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
}