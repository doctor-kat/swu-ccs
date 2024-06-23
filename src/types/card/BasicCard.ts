export interface BasicCard {
    id: number;
    attributes: BasicCardAttributes;
}

export interface BasicCardAttributes {
    cardNumber: number;
    title: string; // name
    subtitle: string;
    cardCount: number;
    artist: string;
    artFrontHorizontal: boolean;
    artBackHorizontal: null;
    hasFoil: boolean;
    cost: number;
    hp: number;
    power: number;
    text: string;
    textStyled: string; // html
    deployBox: string;
    deployBoxStyled: string; // html
    epicAction: string | null;
    epicActionStyled: string | null; // html
    linkHtml: string; // html
    cardId: null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    hyperspace: boolean;
    unique: boolean;
    showcase: boolean;
    cardUid: string;
    rules: null;
    rulesStyled: string;
    serialCode: string;
}
