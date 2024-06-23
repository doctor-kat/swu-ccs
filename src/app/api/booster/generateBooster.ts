import { Card } from "@/types/card/Card";
import { Expansion } from "@/types/card/attributes/Expansion";
import { Rarity } from "@/types/card/attributes/Rarity";
import { Type } from "@/types/card/attributes/Type";
import { getRandomFromList } from "./util";

export async function generateBooster({
    expansion = Expansion.SHD,
    count = 1,
    cards,
}: {
    expansion?: Expansion;
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
                if (![Rarity.RARE, Rarity.SPECIAL].includes(rarity)) {
                    group[type] ??= [];
                    group[type].push(card);
                    break;
                }

            default:
                group[rarity] ??= [];
                group[rarity].push(card);
        }
    }

    const openedCards = Array(Number(count))
        .fill(null)
        .flatMap(() => {
            const boosterPack = [];

            // Leader
            boosterPack.push(getRandomFromList(group[Type.LEADER]));

            // Common Base
            const commonBases = group[Type.BASE].filter(
                (card) =>
                    card.attributes.rarity.data.attributes.name ===
                    Rarity.COMMON,
            );
            boosterPack.push(getRandomFromList(commonBases));

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
                const rareBases = group[Rarity.RARE].filter(
                    (card) =>
                        card.attributes.rarity.data.attributes.name ===
                        Rarity.RARE,
                );

                const rarity = getRandomFromList([
                    ...Array(7).fill(Rarity.RARE),
                    Rarity.LEGENDARY,
                ]);
                switch (rarity) {
                    case Rarity.RARE:
                        boosterPack.push(
                            getRandomFromList([...group[rarity], ...rareBases]),
                        );
                        break;

                    case Rarity.LEGENDARY:
                        boosterPack.push(getRandomFromList(group[rarity]));
                        break;
                }
            }

            // Foil
            {
                const rarity = getRandomFromList([
                    ...Array(9 * 8).fill(Rarity.COMMON),
                    ...Array(3 * 8).fill(Rarity.UNCOMMON),
                    ...Array(7).fill(Rarity.RARE),
                    Rarity.LEGENDARY,
                ]);
                switch (rarity) {
                    case Rarity.COMMON:
                        const commons = group[Rarity.COMMON];
                        const commonBases = group[Type.BASE].filter(
                            (card) =>
                                card.attributes.rarity.data.attributes.name ===
                                Rarity.COMMON,
                        );
                        const commonLeaders = group[Type.LEADER].filter(
                            (card) =>
                                card.attributes.rarity.data.attributes.name ===
                                Rarity.COMMON,
                        );
                        boosterPack.push(
                            getRandomFromList([
                                ...commons,
                                ...commonBases,
                                ...commonLeaders,
                            ]),
                        );
                        break;

                    case Rarity.UNCOMMON:
                        const uncommons = [...group[Rarity.UNCOMMON]];
                        boosterPack.push(getRandomFromList(uncommons));
                        break;

                    case Rarity.RARE:
                        const rares = [...group[Rarity.RARE]];
                        const rareBases = group[Type.BASE].filter(
                            (card) =>
                                card.attributes.rarity.data.attributes.name ===
                                Rarity.RARE,
                        );
                        const rareLeaders = group[Type.LEADER].filter(
                            (card) =>
                                card.attributes.rarity.data.attributes.name ===
                                Rarity.RARE,
                        );
                        boosterPack.push(
                            getRandomFromList([
                                ...rares,
                                ...rareBases,
                                ...rareLeaders,
                            ]),
                        );
                        break;

                    case Rarity.LEGENDARY:
                        const legendaries = [...group[Rarity.LEGENDARY]];
                        boosterPack.push(getRandomFromList(legendaries));
                        break;
                }
            }
            return boosterPack;
        });

    return openedCards;
}
