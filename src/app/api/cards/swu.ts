import { Expansion } from "@/types/card/attributes/Expansion";
import { Card } from "@/types/card/Card";
import { CardsResponse } from "@/types/CardsResponse";

const expansionMap: Record<Expansion, string> = {
    [Expansion.SOR]: "2",
    [Expansion.SHD]: "8",
    [Expansion.TWI]: "18",
};

export async function getCardsPage({
    locale = "en",
    set = Expansion.TWI,
    page = 1,
}): Promise<CardsResponse> {
    const url = `https://admin.starwarsunlimited.com/api/cards`;
    const params = new URLSearchParams({
        locale,
        "orderBy[expansion][id]": "asc",
        "sort[0]":
            "type.sortValue:asc, expansion.sortValue:desc,cardNumber:asc,",
        "filters[variantOf][id][$null]": "true",
        "filters[$and][1][expansion][id][$in][0]": expansionMap[set],
        "pagination[page]": String(page),
        "pagination[pageSize]": "15",
    });
    return (await fetch(url + "?" + params)).json();
}

export async function getAllCards(): Promise<Card[]> {
    const page = await getCardsPage({});
    let cards = page.data;

    for (let i = 1; i < page.meta.pagination.pageCount; i++) {
        const nextPage = getCardsPage({ page: i });
        cards = [...cards, ...(await nextPage).data];
    }

    return cards;
}
