import { NextFunction, Request, Response } from "express";
import { GetUserUseCase } from "../../application/use-cases/get-user.uc.ts";


export class UserController {
    constructor(
        private readonly getUserUseCase: GetUserUseCase,
    ) { }
    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const gameId = req.params.gameId
            
            const user = await this.getUserUseCase.execute({ gameId });
            return res.status(200).json({ user });
        } catch (error) {
            next(error);
        }
    }
}