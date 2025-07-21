import { MatchFindRequest, MatchFindResponse } from "../types";

export interface ICreateGame {
    execute(input: MatchFindRequest): Promise<MatchFindResponse>
}