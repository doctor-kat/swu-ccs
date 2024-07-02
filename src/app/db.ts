import { Card } from "@/types/card/Card";
import Dexie, { type EntityTable } from "dexie";

const db = new Dexie("cards") as Dexie & {
    cards: EntityTable<Card, "id">;
};

db.version(1).stores({
    cards: "++id, data",
});

export { db };
