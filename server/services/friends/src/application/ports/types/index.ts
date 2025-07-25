export type FriendInput = {
    senderId: string,
    receiverId: string
}

export type FriendOuput = {
    success: boolean;
    message: string;
}

export type PendingReqOutput = {
    senderId: string,
    senderName: string,
}

export type ReturnData = {
    friendData: {
        id: string,
        name: string
    }[],
    total: number,
}

export interface DBReturnData {
    senderId: string, 
    receiverId: string,
    status?: string,
    senderName?: string,
    receiverName?: string,
    _id?: string,
    createdAt?: Date,
    updatedAt?: Date
}

export interface FriendsProps {
    senderId: string, 
    receiverId: string,
    status?: string,
    senderName?: string,
    receiverName?: string,
}

export type UserResponse = {
    id: string;
    gameId: string;
    name: string;
    email: string;
    status: string;
    createdAt: Date;
}