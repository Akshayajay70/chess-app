import { ValidationError } from "../errors/validation.error.ts";

export class Email {
    private constructor(private readonly value: string) { }

    public static create(email: string): Email {
        if (!this.isValid(email)) {
            throw new ValidationError(email, 'Invalid email format');
        }
        return new Email(email);
    }

    public getValue(): string {
        return this.value;
    }

    private static isValid(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
}
