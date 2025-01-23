import { Expansion } from "@/types/card/attributes/Expansion";
import { NextRequest } from "next/server";
import { getAllCards } from "./swu";

export async function GET({ nextUrl: { searchParams } }: NextRequest) {
    const set = searchParams.get("set")
        ? Expansion[searchParams.get("set") as keyof typeof Expansion]
        : Expansion.JTL;
    const cards = await getAllCards({ set });
    return Response.json(cards);
}
