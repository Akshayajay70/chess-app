import { AdminResponse } from "./admin-response.ts";

export type SearchResponse = {
    users: AdminResponse[];
    page: number;
    total: number;
    totalPages: number;
}