import { RARITY_ORDER } from "@/types/card/attributes/Rarity";
import { Card } from "@/types/card/Card";

export function sortByAspectRarityCost(a: Card, b: Card): number {
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
            const [costA, costB] = [a, b].map((card) => card.attributes.cost);
            return costA - costB;
        } else {
            return (
                RARITY_ORDER.findIndex((r) => r === rarityA) -
                RARITY_ORDER.findIndex((r) => r === rarityB)
            );
        }
    } else {
        return aspectA > aspectB ? 1 : -1;
    }
}
