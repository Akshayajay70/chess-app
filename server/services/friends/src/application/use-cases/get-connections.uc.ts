import { UseCaseError } from "../../domain/errors/use-case.error.ts";
import { IGetFriendsHelper } from "../helper/cache-get-friends-helper.ts";
import { IFriendsRepo } from "../ports/interfaces/friends-repo.ts";
import { IGetConnectionsUseCase } from "../ports/interfaces/use-case.interface.ts";
import { ReturnData } from "../ports/types/index.ts";

export class GetConnectionsUseCase implements IGetConnectionsUseCase {
    constructor(
        private friendsRepo: IFriendsRepo,
        private cacheService: IGetFriendsHelper,
    ) { }

    async execute(id: string, search: string, limit: number, page: number): Promise<ReturnData> {
        try {
            let key = this.cacheService.generateKey(id, page);
            let totalKey = this.cacheService.generateTotalKey(id);

            if (!search) {
                const data = await this.cacheService.getFriends(key);
                const total = await this.cacheService.getTotal(totalKey);

                if (data && total) {
                    return {
                        friendData: data,
                        total: total
                    }
                }
            }

            let returnData = await this.friendsRepo.getFriendsData(id, search, limit, 'accepted');
            if (!search) {
                await this.cacheService.setFriends(id, page, returnData.friendData);
                await this.cacheService.setTotal(id, returnData.total)
            }
            return returnData

        } catch (error) {
            throw new UseCaseError(
                error instanceof Error
                    ? error.message
                    : 'Failed to get friend details',
                new Error('Failed to get friend details')
            )
        }
    }
}