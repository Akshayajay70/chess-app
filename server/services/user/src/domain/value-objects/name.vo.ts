import { ValidationError } from "../errors/validation.error";

export class Name {
    private constructor(
        private readonly value: string
    ) { }

    public static create(name: string): Name {
        if (!this.isValid(name)) {
            throw new ValidationError(name, 'Invalid name');
        }
        return new Name(name.trim());
    }

    public getValue(): string {
        return this.value;
    }

    private static isValid(name: string): boolean {
        return (
            typeof name === 'string' &&
            name.trim().length >= 3 &&
            name.trim().length <= 20 &&
            /^[A-Za-z\s'-]+$/.test(name)
        );
    }
}
