import { BasicAttributes } from "./Attributes";

export interface AspectResponse {
    id: number;
    attributes: AspectAttributes;
}

interface AspectAttributes extends BasicAttributes<Aspect> {
    locale: string;
    englishName: string;
}

export enum Aspect {
    HEROISM = "Heroism",
    WHITE = "Heroism",
    VILLANY = "Villainy",
    BLACK = "Villainy",
    AGGRESSION = "Aggression",
    RED = "Aggression",
    COMMAND = "Command",
    GREEN = "Command",
    VIGILANCE = "Vigilance",
    BLUE = "Vigilance",
    CUNNING = "Cunning",
    YELLOW = "Cunning",
}
