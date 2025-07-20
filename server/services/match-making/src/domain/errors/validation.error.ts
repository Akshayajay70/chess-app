export class ValidationError<T> extends Error {
    public readonly invalidValue: T;

    constructor(value: T, message = 'Validation failed') {
        super(message);
        this.name = 'ValidationError';
        this.invalidValue = value;
    }
}