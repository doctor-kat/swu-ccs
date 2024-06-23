import { BasicAttributes } from "./Attributes";

export interface ArenaResponse {
    id: number;
    attributes: ArenaAttributes;
}

interface ArenaAttributes extends BasicAttributes<Arena> {
    locale: string;
}

export enum Arena {
    SPACE = "Space",
    GROUND = "Ground",
}
