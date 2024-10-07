import { getAllCards } from "./swu";

export async function GET() {
    const cards = await getAllCards({});
    return Response.json(cards);
}
