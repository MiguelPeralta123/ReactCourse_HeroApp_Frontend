import { heroApi } from "../api/heroes.api"
import type { Hero } from "../interfaces/HeroesResponse"

const apiUrl = import.meta.env.VITE_API_URL;

export const getHeroAction = async (slugId: string): Promise<Hero> => {
    const { data } = await heroApi.get<Hero>(`/api/heroes/${slugId}`);
    data.image = `${apiUrl}/images/${data.image}`;
    return data;
}
