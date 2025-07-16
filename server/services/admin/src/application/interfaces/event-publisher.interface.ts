export type Payload = {
    gameId: string,
    status: string
}

export interface IEventPublisher {
    publish(eventName: string, payload: Payload): Promise<void>
}
