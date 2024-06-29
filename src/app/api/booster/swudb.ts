import { sortByAspectRarityCostId } from "@/app/sort";
import { Expansion } from "@/types/card/attributes/Expansion";
import { Type } from "@/types/card/attributes/Type";
import { Card } from "@/types/card/Card";
import { SWUDBCardEntry, SWUDBDeck } from "@/types/swudb/SWUDBDeck";

export function swuCardToSWUDBCardEntry(card: Card) {
    const {
        attributes: {
            expansion: {
                data: {
                    attributes: { name: expansion },
                },
            },
            cardNumber,
        },
    } = card;
    let set = "SOR";
    switch (expansion) {
        case Expansion.SHD:
            set = "SHD";

        case Expansion.SOR:
        default:
    }

    const swudbCardEntry: SWUDBCardEntry = {
        id: `${set}_${cardNumber.toString().padStart(3, "0")}`,
        count: 1,
    };
    return swudbCardEntry;
}

export function swuCardsToSWUDBDeck(cards: Card[]) {
    const cardCounts: Record<string, number> = {};
    for (const card of cards.filter(
        (card) =>
            ![Type.BASE, Type.LEADER].includes(
                card.attributes.type.data.attributes.name,
            ),
    )) {
        const { id } = swuCardToSWUDBCardEntry(card);
        cardCounts[id] ??= 0;
        cardCounts[id]++;
    }

    const cardEntries = Object.entries(cardCounts).map<SWUDBCardEntry>(
        ([id, count]) => ({ id, count: Math.min(count, 3) }),
    );

    const decklist: Partial<SWUDBDeck> = {
        leader: swuCardToSWUDBCardEntry(
            cards.filter((card) =>
                [Type.LEADER].includes(
                    card.attributes.type.data.attributes.name,
                ),
            )[0],
        ),
        base: swuCardToSWUDBCardEntry(
            cards.filter((card) =>
                [Type.BASE].includes(card.attributes.type.data.attributes.name),
            )[0],
        ),
        deck: [],
        sideboard: cardEntries.sort((a, b) => (a.id > b.id ? 1 : -1)),
    };
    return decklist;
}
