import { ICreateFriendReqUseCase, IGetConnectionsUseCase, IGetPendingRequestsUseCase, IRemoveFriendUseCase, IUpdateFriendUseCase, IUpdateRequestUseCase } from "../../application/ports/interfaces/use-case.interface.ts";
import { Request, Response, NextFunction } from "express";

export class FriendsController {
    constructor(
        private createFriendReqUC: ICreateFriendReqUseCase,
        private getPendingReqUC: IGetPendingRequestsUseCase,
        private updateRequestUC: IUpdateRequestUseCase,
        private getConnectionsUC: IGetConnectionsUseCase,
        private removeFriendUC: IRemoveFriendUseCase,
        private updateFriendUC: IUpdateFriendUseCase
    ) { }

    async createFriendRequest(req: Request, res: Response, next: NextFunction) {
        const {
            senderId,
            receiverId,
        } = req.body
        try {
            console.log(req.body)
            const result = await this.createFriendReqUC.execute({
                senderId: senderId,
                receiverId: receiverId,
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

    async updateRequest(req: Request, res: Response, next: NextFunction) {
        try {
            const receiverId = req.params.id;
            const senderId = req.headers['x-game-id'];
            const { status } = req.body

            const result = await this.updateRequestUC.execute({
                receiverId: String(senderId),
                senderId: receiverId,
                status: status
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
        const senderId = req.headers['x-game-id']
        const receiverId = req.params.id

        try {
            const result = await this.removeFriendUC.execute(
                String(senderId),
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