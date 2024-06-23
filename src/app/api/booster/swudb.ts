import { Card } from "@/types/card/Card";
import { Expansion } from "@/types/card/attributes/Expansion";
import { Type } from "@/types/card/attributes/Type";
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
    const cardsGroupedById: Record<string, number> = {};
    for (const card of cards) {
        const { id } = swuCardToSWUDBCardEntry(card);
        cardsGroupedById[id] ??= 0;
        cardsGroupedById[id]++;
    }

    const cardEntries = Object.entries(cardsGroupedById).map<SWUDBCardEntry>(
        ([id, count]) => ({ id, count: Math.min(count, 3) }),
    );

    const decklist: SWUDBDeck = {
        metadata: {
            name: "Sealed 12345",
            author: "myself",
        },
        leader: swuCardToSWUDBCardEntry(
            cards.filter(
                (card) =>
                    card.attributes.type.data.attributes.name === Type.LEADER,
            )[0],
        ),
        secondleader: null,
        base: swuCardToSWUDBCardEntry(
            cards.filter(
                (card) =>
                    card.attributes.type.data.attributes.name === Type.BASE,
            )[0],
        ),
        deck: [],
        sideboard: cardEntries.sort((a, b) => (a.id > b.id ? 1 : -1)),
    };
    return decklist;
}
