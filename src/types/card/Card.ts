import { ArenaResponse } from "./attributes/Arena";
import { BasicCard, BasicCardAttributes } from "./BasicCard";
import { TraitResponse } from "./attributes/Trait";
import { TypeResponse } from "./attributes/Type";
import { RarityResponse } from "./attributes/Rarity";
import { ExpansionResponse } from "./attributes/Expansion";
import { AspectResponse } from "./attributes/Aspect";
import { CardArtData } from "./Art";
import { KeywordResponse } from "./attributes/Keywords";

export interface Card {
    id: number;
    attributes: CardAttributes;
}

export interface CardAttributes extends BasicCardAttributes {
    artFront: CardArtData;
    artBack: CardArtData;
    artThumbnail: CardArtData;
    localizations: {
        data: BasicCard[];
    };
    variants: { data: [] };
    variantOf: { data: null };
    aspects: {
        data: AspectResponse[];
    };
    aspectDuplicates: { data: [] };
    type: {
        data: TypeResponse;
    };
    type2: {
        data: TypeResponse;
    };
    traits: {
        data: TraitResponse[];
    };
    arenas: {
        data: ArenaResponse[];
    };
    keywords: { data: KeywordResponse[] };
    rarity: {
        data: RarityResponse;
    };
    expansion: {
        data: ExpansionResponse;
    };
    variantTypes: { data: [] };
}
