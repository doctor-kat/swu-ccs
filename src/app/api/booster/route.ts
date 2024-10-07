import { getAllCards } from "@/app/api/cards/swu";
import { Expansion } from "@/types/card/attributes/Expansion";
import { Card } from "@/types/card/Card";
import { NextRequest } from "next/server";
import { cache } from "react";
import { generateBooster } from "./generateBooster";

export async function GET({ nextUrl: { searchParams } }: NextRequest) {
    const set = searchParams.get("set")
        ? Expansion[searchParams.get("set") as keyof typeof Expansion]
        : Expansion.TWI;
    const count = searchParams.get("count") ?? 6;
    const allCards = cache(async () => await getAllCards({ set }));
    const cards: Card[] = await generateBooster({
        count,
        cards: await allCards(),
    });

    return Response.json(cards);
}
