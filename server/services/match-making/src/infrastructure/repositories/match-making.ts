import { QueueValue, SocketDTO, variant } from "../../application/ports/types";
import { IMatchMakingRepo } from "../../application/ports/interfaces/match-making.repo";
import { variants } from "../../domain/value-objects/variants.vo";

export class MatchMakingRepo implements IMatchMakingRepo {
    private readonly variantPool;
    constructor() {
        this.variantPool = Object.fromEntries(
            variants.map(variant => [variant, Array.from({ length: 14 }, () => {
                const queues: Record<string, QueueValue | null> = {};
                for (let i = 1; i <= 5; i++) {
                    queues[`queue${i}`] = null;
                }
                return queues;
            })])
        );
    }

    getContainerIndex(rating: number): number {
        return Math.floor(rating / 250);
    }

    getQueueKey(rating: number): string {
        const queueIndex = Math.floor((rating % 250) / 50);
        return `queue${queueIndex + 1}`;
    }

    async hasInQueue(rating: number, variant: variant): Promise<boolean> {
        return (
            this.variantPool[variant]
            [this.getContainerIndex(rating)]
            [this.getQueueKey(rating)]
                ? true
                : false
        )
    }

    async addToQueue(input: SocketDTO): Promise<boolean> {
        const {
            socketId,
            gameId,
            rating,
            variant
        } = input;
        if (! await this.hasInQueue(rating, variant)) {
            this.variantPool[variant]
            [this.getContainerIndex(rating)]
            [this.getQueueKey(rating)]
                = { gameId, socketId }
            return true;
        }
        return false;
    }

    async getFromQueue(rating: number, variant: variant): Promise<QueueValue | null> {
        const idx = this.getContainerIndex(rating);
        const key = this.getQueueKey(rating);
        return this.variantPool[variant][idx][key]
    }

    async removeFromQueue(rating: number, variant: variant): Promise<void> {
        const idx = this.getContainerIndex(rating);
        const key = this.getQueueKey(rating);
        this.variantPool[variant][idx][key] = null;
    }
}