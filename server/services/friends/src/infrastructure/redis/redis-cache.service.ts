import { ICacheService } from '@/application/ports/interfaces/cache-service';
import { createClient } from 'redis';


export class RedisCacheService implements ICacheService {
    private client;

    constructor() {
        this.client = createClient();
        this.client.connect().catch(console.error);
    }

    async get(key: string): Promise<string | null> {
        return await this.client.get(key);
    }

    async set(key: string, value: string, ttl: number = 300): Promise<void> {
        await this.client.set(key, value, { EX: ttl });
    }

    async del(key: string): Promise<number> {
        return await this.client.del(key);
    }

    async keys(pattern: string): Promise<string[]> {
        return await this.client.keys(pattern);
    }
}
