import { DBReturnData, FriendOuput } from "../ports/types/index.ts";

export interface ICacheFriendHelper {
    generateCacheKey(senderId: string, receiverId: string): string;
    getCachedFriendData(key: string): Promise<any | null>;
    cacheNoRelationship(senderId: string, receiverId: string): Promise<void>;
    cacheFriendData(friendData: DBReturnData): Promise<void>;
    handleExistingStatus(status: string): FriendOuput;
    delCacheData(key: string): Promise<boolean>;
}