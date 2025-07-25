import { GameId } from "../../domain/value-objects/index.vo.ts";
import { UseCaseError } from "../../domain/errors/use-case.error.ts";
import { IFriendsRepo } from "../ports/interfaces/friends-repo.ts";
import { FriendInput, FriendOuput } from "../ports/types/index.ts";
import { IRemovePendingRequestUseCase } from "../ports/interfaces/use-case.interface.ts";

export class RemovePendingRequestUseCase implements IRemovePendingRequestUseCase {
    constructor(
        private readonly friendRepo: IFriendsRepo
    ) { }

    async execute(data: FriendInput): Promise<FriendOuput> {
        try {
            const { receiverId, senderId } = data;
            const validatedReceiverId = GameId.create(receiverId).getValue();
            const validatedSenderId = GameId.create(senderId).getValue();
            const pendingReq = await this.friendRepo.getPendingRequest(validatedReceiverId);
            if (!pendingReq.length) {
                return {
                    success: false,
                    message: 'No friend requests'
                }
            }
            const response = await this.friendRepo.removeRequest({
                senderId: validatedSenderId,
                receiverId: validatedReceiverId
            })
            if (!response) return {
                success: false,
                message: 'Failed to remove friend req'
            }
            return {
                success: true,
                message: 'Friend req removed successfully'
            }
        } catch (error) {
            throw new UseCaseError(
                error instanceof Error
                    ? error.message
                    : 'Failed to delete friend requests',
                new Error('Failed to delete friend requests')
            )
        }
    }
}