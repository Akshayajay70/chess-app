import { Router } from "express";
import { FriendsController } from "../controllers/friends.controller";

export function createFriendsRoute(friendsController: FriendsController): Router {
    const router = Router();

    router.post('/requests', friendsController.createFriendRequest.bind(friendsController));
    router.get('/requests', friendsController.getPendingRequests.bind(friendsController));
    router.delete('/requests/:id', friendsController.removeRequest.bind(friendsController));
    router.get('/connections', friendsController.getConnections.bind(friendsController));
    router.patch('/connections/:id', friendsController.updateFriend.bind(friendsController));
    router.delete('/connections/:id', friendsController.removeFriend.bind(friendsController));

    return router;
}