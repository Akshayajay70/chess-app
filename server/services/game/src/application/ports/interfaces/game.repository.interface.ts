import { GameStateResponse, MatchFindRequest, MatchFindResponse } from "../types/index.ts";

export interface IGameRepo {
    create(input: MatchFindRequest): Promise<MatchFindResponse>;
    find(matchRoomId: string): Promise<GameStateResponse | null>;
    saveFinalState(input: GameStateResponse): Promise<void>;
}