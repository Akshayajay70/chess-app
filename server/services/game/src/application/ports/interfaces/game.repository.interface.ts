import { MatchFindRequest, MatchFindResponse } from "../types";

export interface IGameRepo {
    create(input: MatchFindRequest): Promise<MatchFindResponse>;
}