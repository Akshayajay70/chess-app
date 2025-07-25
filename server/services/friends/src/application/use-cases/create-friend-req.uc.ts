import { UseCaseError } from "../../domain/errors/use-case.error.ts";
import { IFriendsRepo } from "../ports/interfaces/friends-repo.ts";
import { ICreateFriendReqUseCase } from "../ports/interfaces/use-case.interface.ts";
import { FriendInput, FriendOuput, FriendsProps } from "../ports/types/index.ts";

export class CreateFriendReqUseCase implements ICreateFriendReqUseCase {
    constructor(
        private friendsRepo: IFriendsRepo,
    ) { }

    async execute(data: FriendsProps): Promise<FriendOuput> {
        try {
            const { senderId, receiverId } = data;

            if (senderId === receiverId) {
                return {
                    success: false,
                    message: 'Cannot send request to yourself'
                }
            }

            // Create new friend request
            const friendData = await this.friendsRepo.createFriendRequest(data);
            if (!friendData) return {
                success: false,
                message: 'Failed to save data in DB'
            }
            return {
                success: true,
                message: 'Friend request sent successfully',
            };

        } catch (error) {
            throw new UseCaseError(
                error instanceof Error
                    ? error.message
                    : 'Failed to create friend request',
                new Error('Failed to create friend request')
            )
        }
    }
}