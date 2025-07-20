import { VariantType } from "../../../domain/value-objects/variants.vo";

export type variant = VariantType;

export type PlayerDetails = {
    name: string
    gameId: string,
    rating: number
}

export type Value = {
    name: string
    gameId: string,
    variant: variant,
    rating: number,
}

export type SocketId = string;

export type SocketDTO = {
    socketId: SocketId,
} & Value

export type QueueValue = {
    gameId: string,
    socketId: SocketId
}

export type MatchMakingResponse = {
    success: boolean,
    message: string
    matchRoomId?: string,
    whitePlayer?: PlayerDetails,
    blackPlayer?: PlayerDetails,
    variant?: variant
}

export type CommunicationResponse = {
    matchRoomId: string,
    whitePlayer: PlayerDetails,
    blackPlayer: PlayerDetails,
    variant: variant
}