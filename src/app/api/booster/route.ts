import { Card } from "@/types/card/Card";
import { Expansion } from "@/types/card/attributes/Expansion";
import { NextRequest } from "next/server";
import { generateBooster } from "./generateBooster";

export async function GET({ nextUrl: { searchParams } }: NextRequest) {
    const cards: Card[] = await generateBooster({
        expansion: searchParams.get("expansion") as Expansion,
        count: searchParams.get("count") ?? undefined,
        cards: await (await fetch(`${process.env.URL}/api/cards`)).json(),
    });

    return Response.json(cards);
}
