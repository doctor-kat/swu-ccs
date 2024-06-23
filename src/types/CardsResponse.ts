import { Card } from "./card/Card";

export interface CardsResponse {
    data: Card[];
    meta: {
        pagination: Pagination;
    };
}

interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}
