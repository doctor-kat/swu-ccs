import { Aspect } from "@/types/card/attributes/Aspect";
import { Rarity } from "@/types/card/attributes/Rarity";
import { Type } from "@/types/card/attributes/Type";
import { Card } from "@/types/card/Card";

export function sortByAspectThenCost(cards: Card[]): void {
    cards.sort((a, b) => {
        const [aspectA, aspectB] = [a, b].map(
            (card) =>
                card.attributes.aspects.data.filter(
                    (aspect) =>
                        ![Aspect.BLACK, Aspect.WHITE].includes(
                            aspect.attributes.name,
                        ),
                )[0].attributes.name,
        );
        if (aspectA === aspectB) {
            const [costA, costB] = [a, b].map((card) => card.attributes.cost);
            return costA - costB;
        }
        return aspectA > aspectB ? 1 : -1;
    });
}

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
