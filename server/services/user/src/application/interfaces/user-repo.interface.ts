import { UserEntity } from "@/domain/entities/user.entitie";
import { UserResponse } from "../dto/user-response";

export interface IUserRespository {
    create(user: UserEntity): Promise<UserResponse>,
    findByEmail(email: string): Promise<UserResponse | null>,
    findByGameId(gameId: string): Promise<UserResponse | null>,
    updateName(email: string, name: string): Promise<boolean>,
    updateStatus(gameId: string, status: string): Promise<boolean>
}