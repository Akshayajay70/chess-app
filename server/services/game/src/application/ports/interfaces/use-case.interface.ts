import { EndGameRequest, EndGameResponse, GameStateResponse, GetGameStateRequest, MatchFindRequest, MatchFindResponse, MoveGameRequest, MoveGameResponse } from "../types/index.ts";

export interface ICreateGame {
    execute(input: MatchFindRequest): Promise<MatchFindResponse>
}

export interface IMoveGame {
    execute(input: MoveGameRequest): Promise<MoveGameResponse>;
}

export interface IEndGame {
    execute(input: EndGameRequest): Promise<EndGameResponse>;
}

export interface IGetGameState {
    execute(input: GetGameStateRequest): Promise<GameStateResponse | null>;
}