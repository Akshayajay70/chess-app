import { AdminResponse } from "../dtos/admin-response";
import { SearchResponse } from "../dtos/search-response";

export interface ILoginUseCase {
    execute(username: string, password: string): Promise<{ success: boolean, message: string, accessToken?: string }>;
}

export interface ISearchUserUseCase {
    execute(
        search: string,
        page: number,
        limit: number,
        sortType: "asc" | "desc",
        sortDes: string
    ): Promise<SearchResponse>;
}

export interface IUpdateStatusUseCase {
    execute(gameId: string, status: string): Promise<{ success: boolean, message: string }>;
}

export interface ISaveUserUseCase {
    execute(data: AdminResponse): Promise<{ success: boolean, message: string }>;
}