import { Name, GameId, Status } from "./value-objects/index.vo";

export class Friends {
    private constructor(
        private readonly senderName: Name,
        private readonly receiverName: Name,
        private readonly senderId: GameId,
        private readonly receiverId: GameId,
        private readonly status: Status,
    ) { }

    public static create(
        senderName: string,
        receiverName: string,
        senderId: string,
        receiverId: string,
        status: string
    ): Friends {
        return new Friends(
            Name.create(senderName),
            Name.create(receiverName),
            GameId.create(senderId),
            GameId.create(receiverId),
            Status.create(status)
        )
    }

    getSenderId() {
        return this.senderId.getValue();
    }
    getReceiverId() {
        return this.receiverId.getValue();
    }
    getStatus() {
        return this.status.getValue();
    }
    getSenderName() {
        return this.senderName.getValue();
    }
    getReceiverName() {
        return this.receiverName.getValue();
    }
    
}