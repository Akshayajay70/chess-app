import { model } from "mongoose";
import { gameSchema } from "../schema/game.schema";
import { IGameSchema } from "../../../application/ports/types";

export const GameModel = model<IGameSchema>('Game', gameSchema);
