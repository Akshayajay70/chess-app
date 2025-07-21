export class DatabaseError extends Error {
  constructor(
    public readonly operation: "CREATE" | "READ" | "UPDATE" | "DELETE",
    public readonly entity: string,
    public readonly cause?: Error
  ) {
    super(`${operation} operation failed on ${entity}`);
    this.name = "DatabaseError";
  }
}