import { GameId } from "../../domain/value-objects/index.vo.ts";
import { UseCaseError } from "../../domain/errors/use-case.error.ts";
import { IFriendsRepo } from "../ports/interfaces/friends-repo.ts";
import { IGetPendingRequestsUseCase } from "../ports/interfaces/use-case.interface.ts";
import { PendingReqOutput } from "../ports/types/index.ts";

export class GetPendingRequestsUseCase implements IGetPendingRequestsUseCase {
    constructor(
        private readonly friendRepo: IFriendsRepo,
    ) { }

    async execute(id: string): Promise<PendingReqOutput[]> {
        try {
            const validatedId = GameId.create(id).getValue();
            const pendingRequest = await this.friendRepo.getPendingRequest(validatedId);
            return pendingRequest;
        } catch (error) {
            throw new UseCaseError(
                error instanceof Error
                    ? error.message
                    : 'Failed to get pending friend requests',
                new Error('Failed to get pending friend requests')
            )
        }
    }
}