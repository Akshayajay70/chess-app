import { FromUserService } from "../types/index.ts";

export interface IUserCreatedEventListener {
    listen(callback: (data: FromUserService) => Promise<void>): Promise<void>
}
