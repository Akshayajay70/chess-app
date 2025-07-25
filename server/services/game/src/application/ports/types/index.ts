import {
    type VariantType,
    type IVariantSchema,
    variants
} from '../../../domain/entities/variant.entitie.ts';
import {
    PlayerColor,
    PromotionPiece,
    type PlayerColorType,
    type PromotionPieceType,
    type Move as IMove
} from "../../../domain/entities/move.entitie.ts";

import {
    Game,
    gameResults,
    endTypes,
    type GameType,
    type GameResultType,
    type EndType,
    type IPlayer,
    type IGameSchema
} from "../../../domain/entities/game.entitie.ts";

export {
    PlayerColor,
    PromotionPiece,
    PlayerColorType,
    PromotionPieceType,
    VariantType,
    variants,
    IVariantSchema,
    IMove,
    Game,
    gameResults,
    endTypes,
    GameType,
    GameResultType,
    EndType,
    IPlayer,
    IGameSchema
}

export type MatchFindRequest = {
    playerA: IPlayer,
    playerB: IPlayer,
    gameType: GameType,
    variant: VariantType
}

export type MatchFindResponse = {
    matchRoomId: string,
    whitePlayer: IPlayer,
    blackPlayer: IPlayer,
    variant: VariantType
}

export type MoveGameRequest = {
    matchRoomId: string;
    move: IMove;
    player: IPlayer;
};

export type MoveGameResponse = {
    success: boolean;
    message?: string;
    newState?: GameStateResponse;
};

export type EndGameRequest = {
    matchRoomId: string;
    result: GameResultType;
    endType: EndType;
    winner?: IPlayer;
    loser?: IPlayer;
    moves: IMove[];
};

export type EndGameResponse = {
    success: boolean;
    message?: string;
    finalState?: GameStateResponse;
};

export type GetGameStateRequest = {
    matchRoomId: string;
};

export type GameStateResponse = {
    matchRoomId: string;
    players: [IPlayer, IPlayer];
    moves: IMove[];
    variant: VariantType;
    status: 'ongoing' | 'ended';
    result?: GameResultType;
    endType?: EndType;
};

export type JoinGameRequest = {
    matchRoomId: string;
};

export type JoinGameResponse = {
    success: boolean;
};