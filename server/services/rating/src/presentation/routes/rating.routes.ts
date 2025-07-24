import { Router } from "express";
import { RatingController } from "../controllers/rating.controller.ts";

export function createRatingRoutes(ratingController: RatingController): Router {
    const router = Router();

    router.get('/profile', ratingController.getRating.bind(ratingController));

    return router;
}