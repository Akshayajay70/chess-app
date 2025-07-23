import { Router } from "express";
import { AdminController } from "../controllers/admin.controller.ts";

export function createAdminRoutes(adminController: AdminController): Router {
    const router = Router();

    router.post("/login", adminController.login.bind(adminController));
    router.get("/users", adminController.searchUsers.bind(adminController));
    router.patch("/status", adminController.updateStatus.bind(adminController));

    return router;
}
