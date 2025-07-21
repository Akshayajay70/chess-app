import { NextFunction, Request, Response } from "express";
import { ICreateGame } from "../../application/ports/interfaces/use-case.interface";

export class GameController {
    constructor(
        private readonly createGameUseCase: ICreateGame
    ) { }

    async createGame(req: Request, res: Response, next: NextFunction) {
        try {
            const input = req.body;
            console.log(input)
            const result = await this.createGameUseCase.execute(input);
            return res.json(result)
        } catch (error) {
            next(error)
        }
    }
}