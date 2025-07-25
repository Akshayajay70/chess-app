import { GameStateResponse, MatchFindRequest, MatchFindResponse } from "../../../application/ports/types/index.ts";
import { IGameRepo } from "../../../application/ports/interfaces/game.repository.interface.ts";
import { GameModel } from "../models/game.model.ts";
import { DatabaseError } from "../../../domain/errors/database.error.ts";

export class GameRepo implements IGameRepo {
    async create(input: MatchFindRequest): Promise<MatchFindResponse> {
        try {
            console.log(input)
            const match = await GameModel.create({
                whitePlayer: input.playerA,
                blackPlayer: input.playerB,
                varientName: input.variant,
                gameType: input.gameType,
                moves: [],
                result: null,
                endType: null,
                pgn: ""
            });
            return {
                matchRoomId: match._id.toString(),
                whitePlayer: {
                    gameId: match.whitePlayer.gameId,
                    name: match.whitePlayer.name,
                    rating: match.whitePlayer.rating
                },
                blackPlayer: {
                    gameId: match.blackPlayer.gameId,
                    name: match.blackPlayer.name,
                    rating: match.blackPlayer.rating
                },
                variant: match.varientName
            }
        } catch (error) {
            throw new DatabaseError(
                "CREATE",
                "Game",
                error instanceof Error ? error : undefined
            )
        }
    }

    async saveFinalState(input: GameStateResponse): Promise<void> {
        try {
            await GameModel.updateOne(
                { _id: input.gameId },
                {
                    $set: {
                        moves: input.moves,
                        result: input.result,
                        endType: input.endType,
                        status: input.status,
                        variant: input.variant,
                        players: input.players
                    }
                }
            );
        } catch (error) {
            throw new DatabaseError(
                "UPDATE",
                "Game",
                error instanceof Error ? error : undefined
            );
        }
    }
}