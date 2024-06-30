import { FilterGroup, FilterItem } from "@/app/Filters/index";
import { Card, CardAttributes } from "@/types/card/Card";

export function getDistinctValues(
    cards: Card[],
    key: keyof CardAttributes,
): FilterItem[] {
    const matches: string[] = cards.flatMap((card) => {
        const data = (card.attributes[key] as any)?.data;
        if (!data) {
            return card.attributes[key] ?? "None";
        } else if (Array.isArray(data)) {
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

export function updateCounts({
    filterGroup,
    cards,
}: {
    filterGroup: FilterGroup;
    cards: Card[];
}): void {
    Object.entries(filterGroup).forEach(([, filters]) => {
        for (const filter of filters) {
            filter.count = cards.filter((card) => {
                const data = (card.attributes[filter.key] as any)?.data;
                if (!data) {
                    return (
                        filter.name == (card.attributes[filter.key] ?? "None")
                    );
                } else if (Array.isArray(data)) {
                    return data?.some(
                        (d: any) => filter.name === d.attributes.name,
                    );
                } else {
                    return filter.name === data.attributes.name;
                }
            }).length;
        }
    });
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
                                ?.data;
                            if (!data) {
                                return (
                                    filterAcc ||
                                    (card.attributes[filter.key] ?? "None") ==
                                        filter.name
                                );
                            } else if (Array.isArray(data)) {
                                return (
                                    filterAcc ||
                                    data.some((d) =>
                                        d.attributes.name.includes(filter.name),
                                    )
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
