import { Router } from "express";
import { UserController } from "../controllers/user.controller.ts";

export function createUserRoutes(userController: UserController): Router {
    const router = Router();

    router.get("/:gameId", userController.getUser.bind(userController));

    return router;
}
