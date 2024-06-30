import { RARITY_ORDER } from "@/types/card/attributes/Rarity";
import { Card } from "@/types/card/Card";

export function sortByTypeAspectRarityCostId(a: Card, b: Card): number {
    const [typeA, typeB] = [a, b].map(
        (card) => card.attributes.type.data.attributes.name,
    );
    {
        if (typeA === typeB) {
            const [aspectA, aspectB] = [a, b].map(
                (card) =>
                    card.attributes.aspects.data[
                        card.attributes.aspects.data.length - 1
                    ]?.attributes.name,
            );
            if (aspectA === aspectB) {
                const [rarityA, rarityB] = [a, b].map(
                    (card) => card.attributes.rarity.data.attributes.name,
                );
                if (rarityA === rarityB) {
                    const [costA, costB] = [a, b].map(
                        (card) => card.attributes.cost,
                    );
                    if (costA === costB) {
                        const [idA, idB] = [a, b].map((card) => card.id);
                        return idA - idB;
                    } else {
                        return costA - costB;
                    }
                } else {
                    return (
                        RARITY_ORDER.findIndex((r) => r === rarityA) -
                        RARITY_ORDER.findIndex((r) => r === rarityB)
                    );
                }
            } else {
                return aspectA > aspectB ? 1 : -1;
            }
        } else {
            return typeA > typeB ? 1 : -1;
        }
    }
}
