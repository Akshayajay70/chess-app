import { ICreateFriendReqUseCase, IGetConnectionsUseCase, IGetPendingRequestsUseCase, IRemoveFriendUseCase, IUpdateFriendUseCase, IRemovePendingRequestUseCase } from "@/application/ports/interfaces/use-case.interface";
import { Request, Response, NextFunction } from "express";

export class FriendsController {
    constructor(
        private createFriendReqUC: ICreateFriendReqUseCase,
        private getPendingReqUC: IGetPendingRequestsUseCase,
        private removeRequestUC: IRemovePendingRequestUseCase,
        private getConnectionsUC: IGetConnectionsUseCase,
        private removeFriendUC: IRemoveFriendUseCase,
        private updateFriendUC: IUpdateFriendUseCase
    ) { }

    async createFriendRequest(req: Request, res: Response, next: NextFunction) {
        const {
            senderId,
            receiverId,
            senderName,
            receiverName,
        } = req.body
        try {

            const result = await this.createFriendReqUC.execute({
                senderId: senderId,
                receiverId: receiverId,
                senderName: senderName,
                receiverName: receiverName
            })
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }

    async getPendingRequests(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.headers['x-game-id']
            const result = await this.getPendingReqUC.execute(String(id));

            return res.json({
                success: true,
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    async removeRequest(req: Request, res: Response, next: NextFunction) {
        try {
            const receiverId = req.params.id;
            const senderId = req.headers['x-game-id'];

            const result = await this.removeRequestUC.execute({
                receiverId: String(senderId),
                senderId: receiverId
            })

            return res.json(result)
        } catch (error) {
            next(error)
        }
    }


    async getConnections(req: Request, res: Response, next: NextFunction) {
        const {
            search = '',
            limit = 50,
            page = 1
        } = req.query;
        const senderId = req.headers['x-game-id'];
        try {
            const result = await this.getConnectionsUC.execute(
                String(senderId),
                String(search),
                Number(limit),
                Number(page)
            )
            res.json(result);
            return;
        } catch (error) {
            next(error)
        }
    }

    async removeFriend(req: Request, res: Response, next: NextFunction) {
        const {
            senderId,
            receiverId
        } = req.body;

        try {
            const result = await this.removeFriendUC.execute(
                senderId,
                receiverId
            )

            return res.json(result);
        } catch (error) {
            next(error)
        }
    }

    async updateFriend(req: Request, res: Response, next: NextFunction) {
        const {
            senderId,
            receiverId,
            status
        } = req.body;

        try {
            const result = await this.updateFriendUC.execute(
                senderId,
                receiverId,
                status
            )
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }
}