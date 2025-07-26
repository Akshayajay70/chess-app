import { GameId, Status } from "../../domain/value-objects/index.vo.ts";
import { UseCaseError } from "../../domain/errors/use-case.error.ts";
import { IFriendsRepo } from "../ports/interfaces/friends-repo.ts";
import { FriendOuput, FriendsProps } from "../ports/types/index.ts";
import { IUpdateRequestUseCase } from "../ports/interfaces/use-case.interface.ts";

export class UpdateRequestUseCase implements IUpdateRequestUseCase {
    constructor(
        private readonly friendRepo: IFriendsRepo
    ) { }

    async execute(data: FriendsProps): Promise<FriendOuput> {
        try {
            const { receiverId, senderId, status } = data;
            const validatedReceiverId = GameId.create(receiverId).getValue();
            const validatedSenderId = GameId.create(senderId).getValue();
            const validatedStatus = Status.create(status!).getValue()
            const pendingReq = await this.friendRepo.getPendingRequest(validatedReceiverId);
            if (!pendingReq.length) {
                return {
                    success: false,
                    message: 'No friend requests'
                }
            }
            const response = await this.friendRepo.updateRequest({
                senderId: validatedSenderId,
                receiverId: validatedReceiverId,
                status: validatedStatus
            })
            if (!response) return {
                success: false,
                message: 'Failed to update friend status'
            }
            return {
                success: true,
                message: 'Friend status successfully updated: ' + validatedStatus
            }
        } catch (error) {
            throw new UseCaseError(
                error instanceof Error
                    ? error.message
                    : 'Failed to update friend requests status',
                new Error('Failed to update friend requests status')
            )
        }
    }
}