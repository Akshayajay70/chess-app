import { model } from "mongoose";
import { gameSchema } from "../schema/game.schema.ts";
import { IGameSchema } from "../../../application/ports/types/index.ts";

export const GameModel = model<IGameSchema>('Game', gameSchema);
