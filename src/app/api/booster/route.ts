import { getAllCards } from "@/app/api/cards/swu";
import { Expansion } from "@/types/card/attributes/Expansion";
import { Card } from "@/types/card/Card";
import { NextRequest } from "next/server";
import { cache } from "react";
import { generateBooster } from "./generateBooster";

export async function GET({ nextUrl: { searchParams } }: NextRequest) {
    const allCards = cache(async () => await getAllCards());
    const cards: Card[] = await generateBooster({
        expansion: searchParams.get("expansion") as Expansion,
        count: searchParams.get("count") ?? undefined,
        cards: await allCards(),
    });

    return Response.json(cards);
}
