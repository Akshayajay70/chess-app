import { FriendInput, PendingReqOutput, ReturnData, DBReturnData, FriendsProps } from '../types/index.ts';

export interface IFriendsRepo {
    createFriendRequest(data: FriendsProps): Promise<boolean>,
    getPendingRequest(id: string): Promise<PendingReqOutput[]>;
    removeRequest(data: FriendInput): Promise<boolean>;
    getFriendsData(gameId: string, search: string, limit: number, status: string): Promise<ReturnData>,
    friendStatus({ senderId, receiverId }: FriendInput): Promise<DBReturnData | null>,
    removeFriend({ senderId, receiverId }: FriendInput): Promise<boolean>,
    updateFriend({ senderId, receiverId, status }: FriendsProps): Promise<{ success: boolean, message: string }>
}