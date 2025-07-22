import {
    type VariantType,
    type IVariantSchema,
    variants
} from '../../../domain/entities/variant.entitie'
import {
    PlayerColor,
    PromotionPiece,
    type PlayerColorType,
    type PromotionPieceType,
    type Move as IMove
} from "../../../domain/entities/move.entitie";

import {
    Game,
    gameResults,
    endTypes,
    type GameType,
    type GameResultType,
    type EndType,
    type IPlayer,
    type IGameSchema
} from "../../../domain/entities/game.entitie";

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