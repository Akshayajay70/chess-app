import { DBReturnData } from "../ports/types/db-return.interface.ts";
import { FriendRequestResult } from "../ports/types/friend-req-result.interface.ts";

export interface ICacheFriendHelper {
    generateCacheKey(senderId: string, receiverId: string): string;
    getCachedFriendData(key: string): Promise<any | null>;
    cacheNoRelationship(senderId: string, receiverId: string): Promise<void>;
    cacheFriendData(friendData: DBReturnData): Promise<void>;
    handleExistingStatus(status: string): FriendRequestResult;
    delCacheData(key: string): Promise<boolean>;
}