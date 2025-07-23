import { ValidationError } from "../errors/validation.error.ts";

export class Rating {
    constructor(
        private readonly value: number
    ) { }

    public static create(value: number): Rating {
        if (!this.isValid(value)) throw new ValidationError(value, 'Invalid rating');
        return new Rating(value);
    }

    public getValue(): number {
        return this.value
    }

    private static isValid(value: number): boolean {
        return Number.isInteger(value) && value >= 0 && value.toString().length <= 4000;
    }

}