export class Status {
    private constructor(
        private readonly value: string
    ) { }

    public static create(value: string): Status {
        if (!this.isValid(value)) throw new Error('Invalid status format');

        return new Status(value);
    }

    private static isValid(value: string): boolean {
        if (
            value === 'pending' ||
            value === 'accepted' ||
            value === 'rejected' ||
            value === 'blocked'
        ) return true;
        return false;
    }

    public getValue(): string {
        return this.value;
    }
}