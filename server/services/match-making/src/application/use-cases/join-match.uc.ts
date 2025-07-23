import { GameId, Rating, Variant } from "../../domain/value-objects/index.ts";
import { UseCaseError } from "../../domain/errors/use-case.error.ts";
import { ICommunication } from "../ports/interfaces/communication.interface.ts";
import { IPlayerRepository } from "../ports/interfaces/in-memory-player.repo.ts";
import { IMatchMakingRepo } from "../ports/interfaces/match-making.repo.ts";
import { IJoinMatchUseCase } from "../ports/interfaces/uc.interface.ts";
import { MatchMakingResponse, SocketDTO } from "../ports/types/index.ts";

export class JoinMatchUseCase implements IJoinMatchUseCase {
    constructor(
        private readonly matchMakingRepo: IMatchMakingRepo,
        private readonly playerRepo: IPlayerRepository,
        private readonly communication: ICommunication
    ) { };
    async execute(input: SocketDTO): Promise<MatchMakingResponse> {
        try {
            let { gameId, rating, socketId, variant } = input;
            gameId = GameId.create(gameId).getValue();
            rating = Rating.create(rating).getValue();
            variant = Variant.create(variant).getValue();
            if (await this.playerRepo.has(socketId)) {
                return { success: false, message: 'Player already in queue' };
            }

            await this.playerRepo.add(input);

            const isOccupied = await this.matchMakingRepo.hasInQueue(rating, variant);
            if (!isOccupied) {
                await this.matchMakingRepo.addToQueue(input);
                return {
                    success: false,
                    message: 'Player added to queue'
                }
            }
            const opponent = await this.matchMakingRepo.getFromQueue(rating, variant);

            if (!opponent) {
                throw new UseCaseError('Something wrong in algorithm', new Error('no opponent found'));
            }

            const playerA = await this.playerRepo.get(opponent.socketId);
            const playerB = await this.playerRepo.get(socketId);

            if (!playerA || !playerB) {
                throw new UseCaseError('Something wrong in inMemoryStorage', new Error('No player details'));
            }

            const response = await this.communication.post(
                {
                    gameId: playerA.gameId,
                    name: playerA.name,
                    rating: playerA.rating,
                },
                {
                    gameId: playerB.gameId,
                    name: playerB.name,
                    rating: playerB.rating,
                },
                "online",
                playerA.variant
            );

            await this.playerRepo.remove(opponent.socketId);
            await this.playerRepo.remove(socketId);

            await this.matchMakingRepo.removeFromQueue(rating, variant);
            return {
                success: true,
                message: 'Match Found',
                matchRoomId: response.matchRoomId,
                whitePlayer: response.whitePlayer,
                blackPlayer: response.blackPlayer,
                variant: response.variant,
                socketIds: [socketId, opponent.socketId]
            };
        } catch (error) {
            throw new UseCaseError(
                error instanceof Error
                    ? error.message
                    : "Failed to create match",
                error instanceof Error
                    ? error
                    : new Error('Unknown error')
            );
        }
    }

}