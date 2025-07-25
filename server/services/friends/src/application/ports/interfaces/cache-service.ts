export interface ICacheService {
    get(key: string): Promise<string | number | null>;
    keys(key: string): Promise<string[]>;
    set(key: string, value: string | number, TTL: number): Promise<void>;
    del(...keys: string[]): Promise<number>;
}