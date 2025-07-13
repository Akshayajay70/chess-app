import { NextFunction, Request, Response } from "express";
import { GetUserUseCase } from "../../application/use-cases/get-user.uc";

// Extend Express Request type to include 'user'
declare global {
    namespace Express {
        interface Request {
            user?: {
                gameId?: string;
                [key: string]: any;
            };
        }
    }
}

export class UserController {
    constructor(
        private readonly getUserUseCase: GetUserUseCase,
    ) { }
    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userPayload = req.user; // trusted by gateway
            const gameId = req.params.gameId
            if (!userPayload) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const user = await this.getUserUseCase.execute({ gameId });
            return res.status(200).json({ user });
        } catch (error) {
            next(error);
        }
    }
}