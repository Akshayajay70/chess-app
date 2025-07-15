import { Email, Name, GameId, Status, CreatedAt } from "../value-objects";

export class UserEntity {
  private constructor(
    private readonly gameId: GameId,
    private readonly name: Name,
    private readonly email: Email,
    private readonly status: Status,
    private readonly createdAt: CreatedAt
  ) {}

  static create(
    gameId: string,
    name: string,
    email: string,
    status: string,
    createdAt: string
  ): UserEntity {
    return new UserEntity(
      GameId.create(gameId),
      Name.create(name),
      Email.create(email),
      Status.create(status),
      CreatedAt.create(createdAt)
    );
  }

  getGameId(): string {
    return this.gameId.getValue();
  }

  getName(): string {
    return this.name.getValue();
  }

  getEmail(): string {
    return this.email.getValue();
  }

  getStatus(): string {
    return this.status.getValue();
  }

  getCreatedAt(): string {
    return this.createdAt.getValue();
  }
}
