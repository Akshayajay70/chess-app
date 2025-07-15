import { ValidationError } from "../errors/validation.error";

export class CreatedAt {
    private constructor(
        private readonly value: string
    ) { }

    public static create(date: string): CreatedAt {
        if (!this.isValid(date)) {
            throw new ValidationError(date, 'Invalid ISO date string');
        }
        return new CreatedAt(date);
    }

    public getValue(): string {
        return this.value;
    }

    private static isValid(date: string): boolean {
        const parsed = Date.parse(date);
        return !isNaN(parsed) && date === new Date(parsed).toISOString();
    }
}
