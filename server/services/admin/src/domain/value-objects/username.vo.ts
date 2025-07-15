import { ValidationError } from "../errors/validation.error";

export class Username {
    private constructor(
        private readonly value: string
    ) { }

    public static create(name: string): Username {
        if (!this.isValid(name)) {
            throw new ValidationError(name, 'Invalid Username');
        }
        return new Username(name.trim());
    }

    public getValue(): string {
        return this.value;
    }

    private static isValid(name: string): boolean {
        return (
            typeof name === 'string' &&
            name.trim().length >= 3 &&
            name.trim().length <= 10 &&
            /^[A-Za-z0-9\s'-]+$/.test(name)
        );
    }
}
