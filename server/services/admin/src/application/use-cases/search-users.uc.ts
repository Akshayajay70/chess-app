import { UseCaseError } from "@/domain/errors/use-case.error";
import { SearchResponse } from "../dtos/search-response";
import { IAdminRepo } from "../interfaces/admin-repo.interface";
import { ISearchUserUseCase } from "../interfaces/use-case.interface";

export class SearchUsersUseCase implements ISearchUserUseCase {
    constructor(
        private readonly adminRepo: IAdminRepo,
    ) { }
    async execute(
        search: string,
        page: number,
        limit: number,
        sortType: "asc" | "desc",
        sortDes: string
    ): Promise<SearchResponse> {
        try {
            const sort = sortType === "asc" ? 1 : -1;
            const response = await this.adminRepo.search(
                search,
                page,
                limit,
                sort,
                sortDes
            )
            return response
        } catch (error) {
            throw new UseCaseError(
                error instanceof Error
                    ? error.message
                    : "User searching failed",
                error instanceof Error
                    ? error
                    : new Error('Unknown error'))
        }
    }
}