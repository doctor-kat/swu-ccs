import { Rarity } from "@/types/card/attributes/Rarity";
import { Type } from "@/types/card/attributes/Type";
import { Card } from "@/types/card/Card";
import { getRandomFromList } from "./util";

export async function generateBooster({
    count = 1,
    cards,
}: {
    count?: string | number;
    cards: Card[];
}) {
    // group by rarity
    const group: Record<string, Card[]> = {};
    for (const card of cards) {
        const {
            type: {
                data: {
                    attributes: { value: type },
                },
            },
            rarity: {
                data: {
                    attributes: { name: rarity },
                },
            },
        } = card.attributes;

        switch (type) {
            case Type.LEADER:
            case Type.BASE:
                group[type] ??= [];
                group[type].push(card);
                break;

            default:
                group[rarity] ??= [];
                group[rarity].push(card);
        }
    }

    const openedCards = Array(Number(count))
        .fill(null)
        .flatMap(() => {
            const boosterPack = [];

            // Leader and Base
            [Type.LEADER, Type.BASE].forEach((type) => {
                const commons = group[type].filter(
                    (card) =>
                        card.attributes.rarity.data.attributes.name ===
                        Rarity.COMMON,
                );
                const rares = group[type].filter(
                    (card) =>
                        card.attributes.rarity.data.attributes.name ===
                        Rarity.RARE,
                );
                boosterPack.push(
                    getRandomFromList([
                        ...Array(7)
                            .fill(commons)
                            .flatMap((cards) => cards),
                        ...rares,
                    ]),
                );
            });

            // 9 Commons
            Array(9)
                .fill(null)
                .forEach(() =>
                    boosterPack.push(getRandomFromList(group[Rarity.COMMON])),
                );

            // 3 Uncommons
            Array(3)
                .fill(null)
                .forEach(() =>
                    boosterPack.push(getRandomFromList(group[Rarity.UNCOMMON])),
                );

            // 1 Rare or Legendary
            {
                const rarity = getRandomFromList([
                    ...Array(7).fill(Rarity.RARE),
                    Rarity.LEGENDARY,
                ]);
                boosterPack.push(getRandomFromList(group[rarity]));
            }

            // Foil
            {
                const rarity = getRandomFromList([
                    ...Array(9 * 8).fill(Rarity.COMMON),
                    ...Array(3 * 8).fill(Rarity.UNCOMMON),
                    ...Array(7).fill(Rarity.RARE),
                    Rarity.LEGENDARY,
                ]);
                boosterPack.push(getRandomFromList(group[rarity]));
            }
            return boosterPack;
        });

    return openedCards;
}
