import { UserResponse } from "../types/index.ts";

export interface ICommunication {
    get(id: string): Promise<UserResponse>
}