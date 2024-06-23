import { BasicAttributes } from "./Attributes";

export interface ExpansionResponse {
    id: number;
    attributes: ExpansionAttributes;
}

interface ExpansionAttributes extends BasicAttributes<Expansion> {
    locale: string;
    sortValue: number;
}

export enum Expansion {
    SOR = "Spark of Rebellion",
    SHD = "Shadows of the Galaxy",
}
