import { ValidationError } from "../errors/validation.error.ts";


export class GameId {
    private constructor(private readonly value: string) { }

    public static create(id: string): GameId {
        if (!this.isValid(id)) {
            throw new ValidationError(id, 'Invalid Game ID: must be 10 uppercase alphanumeric characters');
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