import { GameStateResponse, MatchFindRequest, MatchFindResponse, SaveGameInput } from "../types/index.ts";

export interface IGameRepo {
    create(input: MatchFindRequest): Promise<MatchFindResponse>;
    find(matchRoomId: string): Promise<GameStateResponse | null>;
    saveFinalState(input: SaveGameInput): Promise<void>;
}