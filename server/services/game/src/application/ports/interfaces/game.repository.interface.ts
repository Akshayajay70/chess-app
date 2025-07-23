import { MatchFindRequest, MatchFindResponse } from "../types/index.ts";

export interface IGameRepo {
    create(input: MatchFindRequest): Promise<MatchFindResponse>;
}