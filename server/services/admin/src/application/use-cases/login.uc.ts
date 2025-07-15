import { Password, Username } from "@/domain/value-objects/index";
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
            const validatedUsername = Username.create(username).getValue();
            const validatedPassword = Password.create(password).getValue();
            const { adminUsername, adminPassword } = config
            if (validatedUsername !== adminUsername && validatedPassword !== adminPassword) {
                return {
                    success: false,
                    message: 'Invalid credentials',
                }
            }
            const accessToken = this.tokenService.generateAccessToken({ role: 'admin' });

            return {
                success: true,
                message: "Admin verified successfully",
                accessToken: accessToken
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