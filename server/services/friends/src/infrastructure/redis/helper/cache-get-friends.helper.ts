import { IGetFriendsHelper } from "@/application/helper/cache-get-friends-helper";
import { ICacheService } from "@/application/ports/interfaces/cache-service";
import { CacheGetFriend } from "@/application/helper/cache-get-friends-helper";


export class GetFriendsHelper implements IGetFriendsHelper {
    constructor(
        private cacheService: ICacheService
    ) { }

    generateKey(senderId: string, page: number): string {
        return `user:${senderId}:friends:${page}`;
    }

    generateTotalKey(senderId: string): string {
        return `user:${senderId}:total`;
    }

    async getFriends(key: string): Promise<CacheGetFriend[] | null> {
        const cached = await this.cacheService.get(key);

        if (!cached || typeof cached !== 'string') return null;

        const data = JSON.parse(cached);
        return data
    }

    async getTotal(key: string): Promise<number> {
        const total = await this.cacheService.get(key);
        return Number(total)
    }

    async setFriends(senderId: string, page: number, data: CacheGetFriend[]): Promise<void> {
        await this.cacheService.set(
            this.generateKey(senderId, page),
            JSON.stringify(data),
            6000
        )
    }

    async setTotal(senderId: string, value: number): Promise<void> {
        await this.cacheService.set(
            this.generateTotalKey(senderId),
            value,
            6000
        )
    }

    async getKeys(senderId: string): Promise<string[]> {
        const keys = `user:${senderId}:friends:*`;
        return this.cacheService.keys(keys);
    }

    async delFriends(keys: string[]): Promise<boolean> {
        if(keys.length < 1) return false;
        const deleted = await this.cacheService.del(...keys)
        return deleted < 0
    }
}