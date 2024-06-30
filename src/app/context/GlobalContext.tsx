import { FilterGroup } from "@/app/Filters";
import { getDistinctValues } from "@/app/Filters/util";
import { Card, CardAttributes } from "@/types/card/Card";
import { createContext, Dispatch, SetStateAction } from "react";

export const FILTER_KEYS: Record<string, keyof CardAttributes> = {
    Type: "type",
    Aspect: "aspects",
    Rarity: "rarity",
    Keywords: "keywords",
    Traits: "traits",
    Cost: "cost",
};

export function generateFilters(cards?: Card[]): FilterGroup {
    return Object.fromEntries(
        Object.entries(FILTER_KEYS).map(([name, key]) => [
            name,
            cards?.length ? getDistinctValues(cards, key) : [],
        ]),
    );
}

const GlobalContext = createContext<{
    filterGroup: FilterGroup;
    setFilterGroup: Dispatch<SetStateAction<FilterGroup>>;
    grouping: keyof CardAttributes;
    setGrouping: Dispatch<SetStateAction<keyof CardAttributes>>;
}>({
    filterGroup: generateFilters(),
    setFilterGroup: () => {},
    grouping: "type",
    setGrouping: () => {},
});
export default GlobalContext;
