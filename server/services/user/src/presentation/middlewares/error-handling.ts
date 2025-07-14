import { type NextFunction, type Request, type Response } from "express";
import { config } from "../../config";
import { DatabaseError } from "../../domain/errors/database.error";
import { ValidationError } from "../../domain/errors/validation.error";
import { GoogleAuthError } from "../../domain/errors/google-auth.error";
import { TokenError } from "../../domain/errors/token.error";
import { UseCaseError } from "../../domain/errors/use-case.error";

const { nodeEnv } = config;

export const errorHandlingMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const isProd = nodeEnv === "production";

    // Default status and message
    let statusCode = 500;
    let message = "Internal Server Error";

    // Custom error handling
    if (err instanceof ValidationError) {
        statusCode = 400;
        message = `Invalid value: ${JSON.stringify(err.invalidValue)} - ${err.message}`;
    }

    else if (err instanceof GoogleAuthError) {
        statusCode = 401;
        message = `Google Auth Error: ${err.type}`;
    }

    else if (err instanceof TokenError) {
        statusCode = 401;
        message = `Token Error: ${err.message}`;
    }

    else if (err instanceof DatabaseError) {
        statusCode = 500;
        message = `Database Error during ${err.operation} on ${err.entity}`;
        if (err.cause && !isProd) {
            message += `: ${err.cause.message}`;
        }
    }

    else if (err instanceof UseCaseError) {
        statusCode = 400;
        message = err.message;
    }

    // Fallback for unexpected errors
    else {
        if (!isProd) {
            message = err.message || message;
        }
    }
    console.error('Error 💥:', {
        statusCode,
        message: err.message,
        stack: err.stack
    });

    res.status(statusCode).json({
        error: message,
        ...(isProd ? {} : { stack: err.stack }) // hide stack in prod
    });
};
