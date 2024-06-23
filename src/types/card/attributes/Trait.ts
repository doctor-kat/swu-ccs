import { BasicAttributes } from "./Attributes";

export interface TraitResponse {
    id: number;
    attributes: TraitAttributes;
}

interface TraitAttributes extends BasicAttributes {
    locale: string;
}
