import { Email, Name, GameId, GoogleId, Status } from "../value-objects";

export class UserEntity {
  private constructor(
    private readonly gameId: GameId,
    private readonly googleId: GoogleId,
    private readonly name: Name,
    private readonly email: Email,
    private readonly status: Status
  ) {}

  static create(
    gameId: string,
    googleId: string,
    name: string,
    email: string,
    status: string
  ): UserEntity {
    return new UserEntity(
      GameId.create(gameId),
      GoogleId.create(googleId),
      Name.create(name),
      Email.create(email),
      Status.create(status)
    );
  }

  getGameId(): string {
    return this.gameId.getValue();
  }

  getGoogleId(): string {
    return this.googleId.getValue();
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
}
