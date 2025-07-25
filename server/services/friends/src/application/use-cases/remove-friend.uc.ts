import { UseCaseError } from "../../domain/errors/use-case.error.ts";
import { ICacheFriendHelper } from "../helper/cache-friend-helper.ts";
import { IGetFriendsHelper } from "../helper/cache-get-friends-helper.ts";
import { IFriendsRepo } from "../ports/interfaces/friends-repo.ts";
import { IRemoveFriendUseCase } from "../ports/interfaces/use-case.interface.ts";

export class RemoveFriendUseCase implements IRemoveFriendUseCase{
    constructor(
        public friendsRepo: IFriendsRepo,
        public cacheFriendService: ICacheFriendHelper,
        public cacheGetFriends: IGetFriendsHelper
    ) { }

    async execute(senderId: string, receiverId: string): Promise<{ success: boolean, message: string }> {
        try {
            const deleted = await this.friendsRepo.removeFriend({ senderId, receiverId });

            if (!deleted) {
                return {
                    success: false,
                    message: 'Not friends'
                };
            }

            const individualFriendKey = this.cacheFriendService.generateCacheKey(senderId, receiverId);
            const paginatedFriendListKeys = await this.cacheGetFriends.getKeys(senderId);

            await this.cacheFriendService.delCacheData(individualFriendKey);
            await this.cacheGetFriends.delFriends(paginatedFriendListKeys);

            return {
                success: true,
                message: 'Removed Friend'
            };

        } catch (error) {
            throw new UseCaseError(
                error instanceof Error
                    ? error.message
                    : 'Failed to delete friend',
                new Error('Failed to delete friend')
            )
        }
    }
}
