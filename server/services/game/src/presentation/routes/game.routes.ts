import { Router } from "express";
import { GameController } from "../controllers/game.controller";

export function createGameRoutes(gameController: GameController): Router {
    const router = Router();

    router.post('/create-game', gameController.createGame.bind(gameController));

    return router
}