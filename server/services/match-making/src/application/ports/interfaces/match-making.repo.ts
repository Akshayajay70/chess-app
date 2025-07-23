import { QueueValue, SocketDTO, variant } from "../types/index.ts";

export interface IMatchMakingRepo {
    getContainerIndex(rating: number): number;
    getQueueKey(rating: number): string;
    hasInQueue(rating: number, variant: variant): Promise<boolean>;
    addToQueue(input: SocketDTO): Promise<boolean>;
    getFromQueue(rating: number, variant: variant): Promise<QueueValue | null>;
    removeFromQueue(rating: number, variant: variant): Promise<void>;
}