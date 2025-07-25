import { ICacheFriendHelper } from "@/application/helper/cache-friend-helper";
import { ICacheService } from "@/application/ports/interfaces/cache-service";
import { DBReturnData } from "@/application/ports/types/db-return.interface";
import { FriendRequestResult } from "@/application/ports/types/friend-req-result.interface";

export class CacheFriendHelper implements ICacheFriendHelper{
    constructor(
        public cacheService: ICacheService
    ) { }
    generateCacheKey(senderId: string, receiverId: string): string {
        return senderId < receiverId
            ? `friends:${senderId}:${receiverId}`
            : `friends:${receiverId}:${senderId}`;
    }

    async getCachedFriendData(key: string): Promise<any | null> {
        try {
            const cached = await this.cacheService.get(key);
            if (!cached || typeof cached !== "string") return null;

            const data = JSON.parse(cached);

            // Check if cache entry is expired (optional additional check)
            if (data.cachedAt) {
                const cacheTime = new Date(data.cachedAt).getTime();
                const now = new Date().getTime();
                const maxAge = data.status === null ? 300000 : 3600000; // 5 min vs 1 hour

                if (now - cacheTime > maxAge) {
                    await this.cacheService.del(key);
                    return null;
                }
            }

            return data;
        } catch (error) {
            console.warn('Cache read failed:', error);
            return null;
        }
    }

    async cacheNoRelationship(senderId: string, receiverId: string): Promise<void> {
        try {
            const key = this.generateCacheKey(senderId, receiverId);
            const cacheData = {
                senderId,
                receiverId,
                status: null, // Explicitly null to indicate "no relationship"
                cachedAt: new Date().toISOString()
            };

            // Cache for shorter time for "no relationship" since this might change
            await this.cacheService.set(key, JSON.stringify(cacheData), 300); // 5 minutes
        } catch (error) {
            console.warn('Failed to cache no relationship:', error);
        }
    }

    async cacheFriendData(friendData: DBReturnData): Promise<void> {
        try {
            const key = this.generateCacheKey(friendData.senderId, friendData.receiverId);
            const cacheData = {
                _id: friendData._id,
                senderId: friendData.senderId,
                receiverId: friendData.receiverId,
                senderName: friendData.senderName,
                receiverName: friendData.receiverName,
                status: friendData.status,
                createdAt: friendData.createdAt,
                updatedAt: friendData.updatedAt
            };

            await this.cacheService.set(key, JSON.stringify(cacheData), 3600); // 1 hour TTL
        } catch (error) {
            console.warn('Cache write failed:', error);
        }
    }

    handleExistingStatus(status: string): FriendRequestResult {
        return {
            success: false,
            message: status === 'blocked' ? 'User blocked' : `Friend request is ${status}`
        };
    }

    async delCacheData(key: string): Promise<boolean> {
        const deleted = await this.cacheService.del(key);
        return deleted === 1;
    }

}