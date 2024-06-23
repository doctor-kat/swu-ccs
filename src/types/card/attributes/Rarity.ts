import { BasicAttributes } from "./Attributes";

export interface RarityResponse {
    id: number;
    attributes: RarityAttributes;
}

interface RarityAttributes extends BasicAttributes<Rarity> {
    locale: string;
    englishName: string;
}

export enum Rarity {
    COMMON = "Common",
    UNCOMMON = "Uncommon",
    RARE = "Rare",
    LEGENDARY = "Legendary",
    SPECIAL = "Special",
}
