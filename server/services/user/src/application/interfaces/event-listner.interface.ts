export type Payload = {
    gameId: string,
    status: string
}

export interface IUserCreatedEventListener {
  listen(callback: (data: Payload) => Promise<void>): Promise<void>
}