import { UserDTO } from "../../application/dto/userDTO.ts";
import { UserResponse } from "../../application/dto/user-response.ts";
import { UserEntity } from "../../domain/entities/user.entitie.ts";

export class UserMapper {
    static toDatabase(user: UserEntity) {
        return {
            gameId: user.getGameId(),
            googleId: user.getGoogleId(),
            name: user.getName(),
            email: user.getEmail(),
            status: user.getStatus(),
        };
    }

    static toDomain(data: UserDTO): UserResponse {
        return {
            id: data._id,
            email: data.email,
            gameId: data.gameId,
            name: data.name,
            status: data.status,
            createdAt: data.createdAt
        }
    }
}
