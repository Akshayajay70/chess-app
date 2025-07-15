import { UserResponse } from "../dto/user-response";

export interface IEventPublisher {
    publish(eventName: string, payload: UserResponse): Promise<void>
}
