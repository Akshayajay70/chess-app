import { FriendInput, FriendOuput, FriendsProps, PendingReqOutput, ReturnData } from "../types/index.ts";

export interface ICreateFriendReqUseCase {
    execute(data: FriendsProps): Promise<FriendOuput>
}

export interface IGetPendingRequestsUseCase {
    execute(id: string): Promise<PendingReqOutput[]>
}

export interface IRemovePendingRequestUseCase {
    execute(data: FriendInput): Promise<FriendOuput>
}

export interface IGetConnectionsUseCase {
    execute(id: string, search: string, limit: number, page: number): Promise<ReturnData>
}

export interface IRemoveFriendUseCase {
    execute(senderId: string, receiverId: string): Promise<{ success: boolean, message: string }>
}

export interface IUpdateFriendUseCase {
    execute(senderId: string, receiverId: string, status: string): Promise<{ success: boolean; message: string }>
}