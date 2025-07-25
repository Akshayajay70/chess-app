export class GameId {
    private constructor(private readonly id: string) { }


    static create(id: string): GameId {
        if (!this.isValid(id)) throw new Error('Invalid gameId');

        return new GameId(id);
    }

    public getValue(): string {
        return this.id;
    }

    private static isValid(id: string): boolean {
        return /^[A-Z0-9]{10}$/.test(id);
    }
}