import { BasicAttributes } from "./Attributes";

export interface KeywordResponse {
    id: number;
    attributes: KeywordAttributes;
}

interface KeywordAttributes extends BasicAttributes {
    locale: string;
}
