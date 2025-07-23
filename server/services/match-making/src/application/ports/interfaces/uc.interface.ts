import { MatchMakingResponse, SocketDTO, SocketId } from "../types/index.ts"

export interface IJoinMatchUseCase {
    execute(input: SocketDTO): Promise<MatchMakingResponse>
}

export interface IHandleDisconnectUseCase {
    execute(socketId: SocketId): Promise<void>;
}