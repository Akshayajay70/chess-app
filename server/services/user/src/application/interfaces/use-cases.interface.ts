import { UserResponse } from "../dto/user-response";

export interface RefreshTokenInput {
    accessToken?: string;
    refreshToken?: string;
}

export interface RefreshTokenOutput {
    accessToken: string;
    refreshToken: string;
}

export type IAuthGoogleUCOutput = {
    user: UserResponse,
    newUser: boolean,
    accessToken?: string,
    refreshToken?: string
}

export type IUpdateNameUCOutput = {
    success: boolean,
    accessToken?: string,
    refreshToken?: string
}

export interface IAuthGoogleUserUseCase {
    execute(code: string): Promise<IAuthGoogleUCOutput>;
}

export interface IUpdateNameUseCase {
    execute(data: {
        email: string;
        newName: string;
    }): Promise<IUpdateNameUCOutput>;
}

export interface IGetUserUseCase {
    execute(data: {
        gameId: string;
    }): Promise<UserResponse | null>;
}

export interface IRefreshTokenUseCase {
    execute(input: RefreshTokenInput): RefreshTokenOutput
}
