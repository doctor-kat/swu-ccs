import { FilterGroup, FilterItem } from "@/app/Filters/index";
import { Card, CardAttributes } from "@/types/card/Card";

export function getDistinctValues(
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

export function applyFilterGroup({
    filterGroup,
    cards,
}: {
    filterGroup: FilterGroup;
    cards: Card[];
}) {
    if (
        Object.values(filterGroup).every((filters) =>
            filters.every((filter) => !filter.active),
        )
    ) {
        return cards;
    }

    return cards.filter((card) =>
        Object.entries(filterGroup).reduce<boolean>(
            (keyAcc, [key, filters]) => {
                const activeFilters = filters.filter((f) => f.active);
                return (
                    keyAcc && // AND between keys ie. Type==Base && Aspect==Command
                    (!activeFilters.length || // no selection = all cards
                        activeFilters.reduce<boolean>((filterAcc, filter) => {
                            const data = (card.attributes[filter.key] as any)
                                .data;
                            if (Array.isArray(data)) {
                                return (
                                    filterAcc ||
                                    data
                                        .map((d) => d.attributes.name)
                                        .includes(filter.name)
                                );
                            } else {
                                return (
                                    filterAcc ||
                                    data.attributes.name === filter.name
                                );
                            }
                        }, false))
                );
            },
            true,
        ),
    );
}
