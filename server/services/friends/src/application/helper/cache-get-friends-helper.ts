export interface CacheGetFriend {
    id: string,
    name: string,
}

export interface IGetFriendsHelper {
    generateKey(senderId: string, page: number): string;
    generateTotalKey(senderId: string): string;
    getFriends(key: string): Promise<CacheGetFriend[] | null>;
    getTotal(key: string): Promise<number>;
    setFriends(senderId: string, page: number, data: CacheGetFriend[]): Promise<void>;
    setTotal(senderId: string, value: number): Promise<void>;
    getKeys(senderId: string): Promise<string[]>;
    delFriends(keys: string[]): Promise<boolean>;
}