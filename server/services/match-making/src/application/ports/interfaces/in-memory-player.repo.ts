import { SocketDTO, SocketId, Value } from "../types/index.ts";

export interface IPlayerRepository {
    add(input: SocketDTO): Promise<void>;
    get(socketId: SocketId): Promise<Value | undefined>;
    remove(socketId: SocketId): Promise<boolean>;
    has(socketId: SocketId): Promise<boolean>;
}
