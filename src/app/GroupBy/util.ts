import { sortByAspectRarityCost } from "@/app/sort";
import { Aspect } from "@/types/card/attributes/Aspect";
import { RARITY_ORDER } from "@/types/card/attributes/Rarity";
import { Card, CardAttributes } from "@/types/card/Card";

export function groupBy(
    cards: Card[],
    key: keyof CardAttributes,
): Record<string, Card[]> {
    const groups: Record<string, Card[]> = {};
    for (const card of cards) {
        const data = (card.attributes[key] as any).data;
        switch (key) {
            case "aspects":
                const aspects: Aspect[] = data.flatMap(
                    (d: any) => d.attributes.name,
                );
                if (aspects.length >= 2) {
                    const primaryAspect = aspects.filter(
                        (a) => ![Aspect.HEROISM, Aspect.VILLANY].includes(a),
                    )[0];
                    groups[primaryAspect] ??= [];
                    groups[primaryAspect].push(card);
                } else if (aspects.length == 1) {
                    groups[aspects[0]] ??= [];
                    groups[aspects[0]].push(card);
                } else {
                    const key = "None";
                    groups[key] ??= [];
                    groups[key].push(card);
                }
                break;

            case "rarity":
                RARITY_ORDER.forEach((rarity) => {
                    groups[rarity] ??= [];
                });
            // intentionally fall through to default
            default:
                if (Array.isArray(data)) {
                    // TODO: handle multiple values
                    const value = data.length
                        ? data[0].attributes.name
                        : "None";
                    groups[value] ??= [];
                    groups[value].push(card);
                } else {
                    const value = data.attributes.name;
                    groups[value] ??= [];
                    groups[value].push(card);
                }
        }
    }
    for (const group in groups) {
        if (!groups[group].length) {
            delete groups[group];
            continue;
        }
        groups[group].sort(sortByAspectRarityCost);
    }
    return groups;
}
