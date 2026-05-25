import { useQuery } from '@tanstack/react-query';
import { getHeroesAction } from '../actions/get-heroes.action';

export const useHeroesByPage = (page: number, limit: number, category: string) => {
    if (isNaN(page)) page = 1;
    if (isNaN(limit)) limit = 6;
    return useQuery({
        queryKey: ['heroes', { page, limit, category }],
        queryFn: () => getHeroesAction(+page, +limit, category),
        staleTime: 1000 * 60 * 5
    });
}
