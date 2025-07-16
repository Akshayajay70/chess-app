import { ILoginUseCase } from "../interfaces/use-case.interface";
import { config } from "../../config/index";
import { ITokenService } from "../interfaces/token.interface";
import { UseCaseError } from "../../domain/errors/use-case.error";

export class LoginUseCase implements ILoginUseCase {
    constructor(
        private readonly tokenService: ITokenService
    ) { }

    async execute(username: string, password: string): Promise<{ success: boolean, message: string, accessToken?: string; }> {
        try {
            const { adminUsername, adminPassword } = config
            console.log(username, password)
            if (username === adminUsername && password === adminPassword) {
                const accessToken = this.tokenService.generateAccessToken({ role: 'admin' });

                return {
                    success: true,
                    message: "Admin verified successfully",
                    accessToken: accessToken
                }
            }
            return {
                success: false,
                message: 'Invalid credentials',
            }
        } catch (error) {
            throw new UseCaseError(
                error instanceof Error
                    ? error.message
                    : "Admin verfication failed",
                error instanceof Error
                    ? error
                    : new Error('Unknown error'))
        }
    }
}