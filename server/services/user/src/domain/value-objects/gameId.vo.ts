import { ValidationError } from "../errors/validation.error.ts";
import { randomBytes } from 'crypto';


export class GameId {
    private constructor(private readonly value: string) { }

    public static create(id: string): GameId {
        if (!this.isValid(id)) {
            throw new ValidationError(id, 'Invalid Game ID: must be 10 uppercase alphanumeric characters');
        }
        return new GameId(id);
    }

    public static generate(): GameId {
        const BASE36 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const length = 10;
        const bytes = randomBytes(length);
        let id = '';
        for (let i = 0; i < length; i++) {
            id += BASE36[bytes[i] % BASE36.length];
        }
        return new GameId(id);
    }

    public getValue(): string {
        return this.value;
    }

    private static isValid(id: string): boolean {
        return /^[A-Z0-9]{10}$/.test(id);
    }
}
