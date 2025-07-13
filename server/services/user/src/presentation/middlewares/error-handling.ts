import { type NextFunction, type Request, type Response } from "express";
import { config } from "../../config";

const { nodeEnv } = config

export const errorHandlingMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    
}