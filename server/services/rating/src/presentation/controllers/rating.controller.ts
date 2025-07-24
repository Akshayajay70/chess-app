import { IGetRatingUseCase } from "../../application/ports/interfaces/uc.interface.ts";
import { NextFunction, Request, Response } from "express";

export class RatingController {
    constructor(
        private readonly getUserRating: IGetRatingUseCase
    ) { }
    async getRating(req: Request, res: Response, next: NextFunction) {
        try {
            const { gameId } = req.body;
            const response = await this.getUserRating.execute(gameId);
            if (!response) {
                return res.status(401).json({
                    success: false,
                    message: `No rating found for gameId: ${gameId}`
                });
            }
            return res.status(200).json({
                success: true,
                message: `Ratings found successfully`,
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}