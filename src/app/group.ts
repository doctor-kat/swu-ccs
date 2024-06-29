import { Rarity } from "@/types/card/attributes/Rarity";
import { Type } from "@/types/card/attributes/Type";
import { Card } from "@/types/card/Card";

export function groupByRarity(cards: Card[]): Record<string, Card[]> {
    const legendariesAndRares = cards.filter((card) =>
        [Rarity.LEGENDARY, Rarity.RARE].includes(
            card.attributes.rarity.data.attributes.name,
        ),
    );
    const uncommons = cards.filter((card) =>
        [Rarity.UNCOMMON].includes(card.attributes.rarity.data.attributes.name),
    );
    const commons = cards.filter((card) =>
        [Rarity.COMMON].includes(card.attributes.rarity.data.attributes.name),
    );
    return {
        legendariesAndRares,
        uncommons,
        commons,
    };
}

export function groupByLeadersAndBases(cards: Card[]): Record<string, Card[]> {
    const group: Record<string, Card[]> = {
        leaders: [],
        bases: [],
        cards: [],
    };

    for (const card of cards) {
        const type = card.attributes.type.data.attributes.name;
        switch (type) {
            case Type.LEADER:
                group.leaders.push(card);
                break;

            case Type.BASE:
                group.bases.push(card);
                break;

            default:
                group.cards.push(card);
                break;
        }
    }

    return group;
}

export function groupBy(cards: Card[]): Record<string, string[]> {
    const keywords = new Set<string>();
    const traits = new Set<string>();

    for (const card of cards) {
        card.attributes.keywords.data
            .map((k) => k.attributes.name)
            .forEach((keyword) => keywords.add(keyword));
        card.attributes.traits.data
            .map((t) => t.attributes.name)
            .forEach((trait) => traits.add(trait));
    }

    return {
        keywords: Array.from(keywords).sort((a, b) => (a > b ? 1 : -1)),
        traits: Array.from(traits).sort((a, b) => (a > b ? 1 : -1)),
    };
}
