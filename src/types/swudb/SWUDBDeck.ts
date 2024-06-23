export interface SWUDBDeck {
    metadata: {
        name: string;
        author: string;
    };
    leader: SWUDBCardEntry;
    secondleader: SWUDBCardEntry | null;
    base: SWUDBCardEntry;
    deck: SWUDBCardEntry[];
    sideboard: SWUDBCardEntry[];
}

export interface SWUDBCardEntry {
    id: string;
    count: number;
}
