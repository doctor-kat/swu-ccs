import { Expansion } from "@/types/card/attributes/Expansion";
import { Type } from "@/types/card/attributes/Type";
import { Card } from "@/types/card/Card";
import { SWUDBCardEntry, SWUDBDeck } from "@/types/swudb/SWUDBDeck";

function getSORReprint(cardNumber: number): string {
    return (
        {
            66: "SOR_068", // Cargo Juggernaut
            238: "SOR_229", // Cell Block Guard
            30: "SOR_033", // Death Trooper
            166: "SOR_162", // Disabling Fang Fighter
            81: "SOR_080", // General Tagge
            121: "SOR_117", // Mercenary Company
            70: "SOR_069", // Resilient
            83: "SOR_081", // Seasoned Shoretrooper
            223: "SOR_215", // Snapshot Reflexes
            236: "SOR_227", // Snowtrooper Lieutenant
            85: "SOR_083", // Superlaser Technician
            231: "SOR_220", // Surprise Strike
            63: "SOR_066", // System Patrol Craft
            257: "SOR_247", // Underworld Thug
        }[cardNumber] ?? ""
    );
}

function getSWUDBAlternative(cardNumber: number): string {
    return (
        {
            19: "SOR_020", // Remnant Science Facility
            20: "SOR_021", // Remote Village
            21: "SOR_023", // Maz Kanata’s Castle
            22: "SOR_024", // Nevarro City
            23: "SOR_026", // Death Watch Hideout
            24: "SOR_027", // Spice Mines
            25: "SOR_029", // Coronet City
            26: "SOR_030", // Jabba’s Palace
        }[cardNumber] ?? ""
    );
}

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
            // swudb doesn't support SHD reprints
            if (getSORReprint(cardNumber)) {
                return {
                    id: getSORReprint(cardNumber),
                    count: 1,
                };
            }

            // swudb doesn't support SHD bases
            if (getSWUDBAlternative(cardNumber)) {
                return {
                    id: getSWUDBAlternative(cardNumber),
                    count: 1,
                };
            }

            set = "SHD";
            break;

        case Expansion.SOR:
        default:
            set = "SOR";
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
