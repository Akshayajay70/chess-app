export class UseCaseError extends Error {
    public readonly cause: Error;

    constructor(message: string, cause: Error) {
        super(message);
        this.name = "UseCaseError";
        this.cause = cause;
    }
}
