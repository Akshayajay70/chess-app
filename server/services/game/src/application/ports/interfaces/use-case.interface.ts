import { MatchFindRequest, MatchFindResponse } from "../types/index.ts";

export interface ICreateGame {
    execute(input: MatchFindRequest): Promise<MatchFindResponse>
}