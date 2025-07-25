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
                { _id: input.matchRoomId },
                {
                    $set: {
                        moves: input.moves,
                        result: input.result,
                        endType: input.endType
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

    async find(matchRoomId: string): Promise<GameStateResponse | null> {
        const game = await GameModel.findOne({ _id: matchRoomId });
        if (!game) return null;

        // Map DB fields to GameStateResponse
        return {
            matchRoomId: game._id.toString(),
            players: [
                {
                    gameId: game.whitePlayer.gameId,
                    name: game.whitePlayer.name,
                    rating: game.whitePlayer.rating
                },
                {
                    gameId: game.blackPlayer.gameId,
                    name: game.blackPlayer.name,
                    rating: game.blackPlayer.rating
                }
            ],
            moves: game.moves,
            variant: game.varientName,
            status: game.result ? 'ended': 'ongoing',
            result: game.result ?? undefined,
            endType: game.endType
        };
    }
}