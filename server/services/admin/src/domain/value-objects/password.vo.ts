import { ValidationError } from "../errors/validation.error";

export class Password {
    private constructor(
        private readonly value: string
    ) { }

    public static create(password: string): Password {
        if (!this.isValid(password)) {
            throw new ValidationError(password, 'Invalid Password');
        }
        return new Password(password.trim());
    }

    public getValue(): string {
        return this.value;
    }

    private static isValid(password: string): boolean {
        return (
            typeof password === 'string' &&
            password.trim().length >= 3 &&
            password.trim().length <= 10 &&
            /^[A-Za-z0-9\s'-]+$/.test(password)
        );
    }
}
