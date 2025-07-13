import { ValidationError } from "../errors/validation.error";

export class GoogleId {
    private constructor(private readonly value: string) { }

    public static create(googleId: string): GoogleId {
        if (!this.isValid(googleId)) {
            throw new ValidationError(googleId, 'Invalid Google ID');
        }
        return new GoogleId(googleId);
    }

    public getValue(): string {
        return this.value;
    }

    private static isValid(googleId: string): boolean {
        return typeof googleId === 'string' && googleId.trim().length > 0;
    }
}
