import { MatchMakingResponse, SocketDTO, SocketId } from "../types"

export interface IJoinMatchUseCase {
    execute(input: SocketDTO): Promise<MatchMakingResponse>
}

export interface IHandleDisconnectUseCase {
    execute(socketId: SocketId): Promise<void>;
}