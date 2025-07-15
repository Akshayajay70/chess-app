import { AdminResponse } from "../dtos/admin-response";
import { SearchResponse } from "../dtos/search-response";

export interface IAdminRepo {
    saveUser(data: AdminResponse): Promise<boolean>
    findByGameId(gameId: string): Promise<AdminResponse | null>
    search(search: string, page: number, limit: number, sortType: 1 | -1, sortDes: string): Promise<SearchResponse>;
    updateStatus(gameId: string, status: string): Promise<boolean>;
}