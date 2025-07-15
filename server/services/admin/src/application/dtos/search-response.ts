import { AdminResponse } from "./admin-response";

export type SearchResponse = {
    users: AdminResponse[];
    page: number;
    total: number;
    totalPages: number;
}