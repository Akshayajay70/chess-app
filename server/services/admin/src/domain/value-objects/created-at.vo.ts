import { ValidationError } from "../errors/validation.error.ts";

export class CreatedAt {
    private constructor(
        private readonly value: Date
    ) {}

    public static create(date: string): CreatedAt {
        const parsed = Date.parse(date);
        const parsedDate = new Date(parsed);

        if (isNaN(parsed) || date !== parsedDate.toISOString()) {
            throw new ValidationError(date, 'Invalid ISO date string');
        }

        return new CreatedAt(parsedDate);
    }

    public getValue(): Date {
        return this.value;
    }
}
