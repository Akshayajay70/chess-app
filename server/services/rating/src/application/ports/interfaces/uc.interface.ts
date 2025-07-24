import { ToResponse } from "../types/index.ts";

export interface ICreateUserRatingUseCase {
    execute(): Promise<void>;
}
export interface IGetRatingUseCase {
    execute(gameId: string): Promise<ToResponse | null>;
}
