import { FromUserService, ToResponse } from "../types/index.ts";

export interface IRatingRepo {
    save(input: FromUserService): Promise<boolean>;
    findByGameId(gameId: string): Promise<ToResponse | null>
}