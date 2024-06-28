import { Card, CardAttributes } from "@/types/card/Card";

export type FilterGroup = Record<string, FilterItem[]>;
export type FilterItem = {
    name: string;
    count: number;
    key: keyof CardAttributes;
    active?: boolean;
};

function getDistinctValues(
    cards: Card[],
    key: keyof CardAttributes,
): FilterItem[] {
    const matches: string[] = cards.flatMap((card) => {
        const data = (card.attributes[key] as any).data;
        if (Array.isArray(data)) {
            return data.flatMap((d: any) => d.attributes.name);
        } else {
            return data.attributes.name;
        }
    });
    const matchCount = matches.reduce<Record<string, number>>((acc, match) => {
        acc[match] ??= 0;
        acc[match]++;
        return acc;
    }, {});
    return Object.entries(matchCount)
        .map(([name, count]) => ({
            name,
            count,
            key,
        }))
        .sort((a, b) => (a.name > b.name ? 1 : -1));
}

function getFilterKeys(): Record<string, keyof CardAttributes> {
    return {
        Type: "type",
        Aspect: "aspects",
        Rarity: "rarity",
        Keywords: "keywords",
        Traits: "traits",
    };
}

export function getEmptyFilters(): FilterGroup {
    return Object.fromEntries(
        Object.entries(getFilterKeys()).map(([name, key]) => [name, []]),
    );
}

export function getFilters(cards: Card[]): FilterGroup {
    return Object.fromEntries(
        Object.entries(getFilterKeys()).map(([name, key]) => [
            name,
            getDistinctValues(cards, key),
        ]),
    );
}

export function filterCards(filterGroup: FilterGroup, cards: Card[]) {
    if (
        Object.values(filterGroup).every((filters) =>
            filters.every((filter) => !filter.active),
        )
    ) {
        return cards;
    }

    return cards.filter((card) =>
        Object.entries(filterGroup).reduce<boolean>(
            (acc, [key, filters]) =>
                acc ||
                filters
                    .filter((f) => f.active)
                    .reduce<boolean>((acc, filter) => {
                        const data = (card.attributes[filter.key] as any).data;
                        if (Array.isArray(data)) {
                            return (
                                acc ||
                                data
                                    .map((d) => d.attributes.name)
                                    .includes(filter.name)
                            );
                        } else {
                            return acc || data.attributes.name === filter.name;
                        }
                    }, false),
            false,
        ),
    );
}
