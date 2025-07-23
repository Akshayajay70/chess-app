import { UserResponse } from "../dto/user-response.ts";

export interface IEventPublisher {
    publish(eventName: string, payload: UserResponse): Promise<void>
}
