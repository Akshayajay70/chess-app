import { AdminResponse } from "../dtos/admin-response";

export interface IUserCreatedEventListener {
  listen(callback: (data: AdminResponse) => Promise<void>): Promise<void>
}
