import { heroApi } from "../api/heroes.api"
import type { HeroesResponse } from "../interfaces/HeroesResponse";

export const getHeroesAction = async (
    page: number,
    limit: number,
    category: string
): Promise<HeroesResponse> => {
    page = isNaN(page) ? 1 : page;
    limit = isNaN(limit) ? 6 : limit;
    const { data } = await heroApi.get<HeroesResponse>('/api/heroes', {
        params: {
            offset: (page - 1) * limit,
            limit,
            category
        }
    });
    return data;
}