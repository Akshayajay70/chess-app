import { UseCaseError } from "../../domain/errors/use-case.error.ts";
import { SearchResponse } from "../dtos/search-response.ts";
import { IAdminRepo } from "../interfaces/admin-repo.interface.ts";
import { ISearchUserUseCase } from "../interfaces/use-case.interface.ts";

export class SearchUsersUseCase implements ISearchUserUseCase {
    constructor(
        private readonly adminRepo: IAdminRepo,
    ) { }
    async execute(
        search: string,
        page: number,
        limit: number,
        sortType: 1 | -1,
        sortDes: string
    ): Promise<SearchResponse> {
        try {
            const response = await this.adminRepo.search(
                search,
                page,
                limit,
                sortType,
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