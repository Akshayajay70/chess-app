import { NextFunction, Request, Response } from "express";
import { ICreateGame, IGetGameState } from "../../application/ports/interfaces/use-case.interface.ts";

export class GameController {
    constructor(
        private readonly createGameUseCase: ICreateGame,
        private readonly getGameUseCase: IGetGameState
    ) { }

    async createGame(req: Request, res: Response, next: NextFunction) {
        try {
            const input = req.body;
            const result = await this.createGameUseCase.execute(input);
            return res.json(result)
        } catch (error) {
            next(error)
        }
    }

    async getGameState(req: Request, res: Response, next: NextFunction) {
        try {
            const { matchRoomId } = req.body;
            const result = await this.getGameUseCase.execute(matchRoomId);

            return res.json(result)
        } catch (error) {
            next(error)
        }
    }
}