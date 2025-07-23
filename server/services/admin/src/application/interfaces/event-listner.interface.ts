import { AdminResponse } from "../dtos/admin-response.ts";

export interface IUserCreatedEventListener {
  listen(callback: (data: AdminResponse) => Promise<void>): Promise<void>
}
