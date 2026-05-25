import { heroApi } from "../api/heroes.api"
import type { Hero } from "../interfaces/HeroesResponse";

export const getHeroByFiltersAction = async (name: string, strength: string) => {
    const { data } = await heroApi.get<Hero[]>(`/api/heroes/search?name=${name}&strength=${strength}`);
    return data;
}
