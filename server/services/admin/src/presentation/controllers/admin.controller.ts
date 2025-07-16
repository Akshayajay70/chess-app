import { NextFunction, Request, Response } from "express";
import { ILoginUseCase, ISearchUserUseCase, IUpdateStatusUseCase } from "../../application/interfaces/use-case.interface";

export class AdminController {
    constructor(
        private readonly loginUseCase: ILoginUseCase,
        private readonly searchUserUseCase: ISearchUserUseCase,
        private readonly updateStatusUseCase: IUpdateStatusUseCase
    ) {}

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;
            const result = await this.loginUseCase.execute(username, password);
            return res.status(result.success ? 200 : 401).json(result);
        } catch (error) {
            next(error);
        }
    }

    async searchUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const { search = "", page = 1, limit = 50, sortType = 1, sortDes = "name" } = req.query;
            const sort = Number(sortType) === 1 ? 1 : -1
            const result = await this.searchUserUseCase.execute(
                String(search),
                Number(page),
                Number(limit),
                sort,
                String(sortDes)
            );
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { gameId, status } = req.body;
            const result = await this.updateStatusUseCase.execute(gameId, status);
            return res.status(result.success ? 200 : 400).json(result);
        } catch (error) {
            next(error);
        }
    }
}

