import { Card, CardAttributes } from "@/types/card/Card";

export type FilterGroup = Record<string, FilterItem[]>;
export type FilterItem = {
    name: string;
    count: number;
    key: string;
    active?: boolean;
};

function getDistinctValues(cards: Card[], key: string): FilterItem[] {
    const matches: string[] = cards.flatMap((card) =>
        (card.attributes[key as keyof CardAttributes] as any).data.flatMap(
            (d: any) => d.attributes.name,
        ),
    );
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

function getFilterKeys(): Record<string, string> {
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

// export function filterCards(filterGroup: FilterGroup, cards: Card[]) {
//     const matches = cards.filter((card) => {
//         Object.entries(filterGroup).reduce<boolean>((acc, [key, filters]) => {
//             filters
//                 .filter((f) => f.active)
//                 .reduce<boolean>((acc, filter) => {
//                     const data = card.attributes[key].data;
//                     if (Array.isArray(data)) {
//                         data.indexOf((d) => d.attributes.name);
//                     } else {
//                     }
//                 });
//         });
//     });
// }
