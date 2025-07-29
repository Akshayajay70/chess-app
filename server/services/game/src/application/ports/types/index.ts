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

export type AddMoveRequest = {
    matchRoomId: string;
    move: IMove;
};

export type EndGameRequest = {
    matchRoomId: string;
    result: GameResultType;
    endType: EndType;
};

export type SaveGameInput = {
    matchRoomId: string;
    result: GameResultType;
    endType: EndType;
    moves: IMove[]
}

export type GameStateResponse = {
    matchRoomId: string;
    players: [IPlayer, IPlayer];
    moves: IMove[];
    variant: VariantType;
    result?: GameResultType;
    endType?: EndType;
};

export type JoinMatchResponse = { 
    success: boolean, 
    message?: string 
}