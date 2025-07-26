import { UseCaseError } from "../../domain/errors/use-case.error";
import { ICacheFriendHelper } from "../helper/cache-friend-helper";
import { IGetFriendsHelper } from "../helper/cache-get-friends-helper";
import { IFriendsRepo } from "../ports/interfaces/friends-repo";
import { IUpdateFriendUseCase } from "../ports/interfaces/use-case.interface";

export class UpdateFriendUseCase implements IUpdateFriendUseCase{
    constructor(
        public friendsRepo: IFriendsRepo,
        public cacheFriendService: ICacheFriendHelper,
        public cacheGetFriends: IGetFriendsHelper
    ) { }

    async execute(senderId: string, receiverId: string, status: string): Promise<{ success: boolean; message: string }> {
        try {
            const exists = await this.friendsRepo.friendStatus({ senderId, receiverId });

            if (!exists) {
                return {
                    success: false,
                    message: 'No data found'
                };
            }

            const result = await this.friendsRepo.updateFriend({ senderId, receiverId, status });

            // const individualFriendKey = this.cacheFriendService.generateCacheKey(senderId, receiverId);
            // const paginatedFriendListKeys = await this.cacheGetFriends.getKeys(senderId);

            // await Promise.all([
            //     this.cacheFriendService.delCacheData(individualFriendKey),
            //     this.cacheGetFriends.delFriends(paginatedFriendListKeys)
            // ]);

            return {
                success: result.success,
                message: result.message
            };

        } catch (error) {
            throw new UseCaseError(
                error instanceof Error
                    ? error.message
                    : 'Failed to update status',
                new Error('Failed to update status')
            )
        }
    }
}
