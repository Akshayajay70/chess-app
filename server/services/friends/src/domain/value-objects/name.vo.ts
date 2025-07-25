export class Name {
    private constructor(private readonly value: string) { }

    public static create(name: string): Name {
        if (!this.isValid(name)) {
            throw new Error('Invalid name');
        }
        return new Name(name.trim());
    }

    public getValue(): string {
        return this.value;
    }

    private static isValid(name: string): boolean {
        return (
            typeof name === 'string' &&
            name.trim().length >= 2 &&
            name.trim().length <= 50
        );
    }
}
