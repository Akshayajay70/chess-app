import { EndGameRequest, GameStateResponse, MatchFindRequest, MatchFindResponse, AddMoveRequest, IMove } from "../types/index.ts";

export interface ICreateGame {
    execute(input: MatchFindRequest): Promise<MatchFindResponse>
}

export interface IAddMove {
    execute(input: AddMoveRequest): Promise<void>
}

export interface IUndoMove {
    execute(matchRoomId: string): Promise<IMove | null>
}

export interface IEndGame {
    execute(input: EndGameRequest): Promise<GameStateResponse | null>;
}

export interface IGetGameState {
    execute(matchRoomId: string): Promise<GameStateResponse | null>;
}
