import { useQuery } from '@tanstack/react-query'
import { getHeroByFiltersAction } from '../actions/get-hero-by-filters.action';

export const useHeroByFilters = (name: string, strength: string) => {
    return useQuery({
        queryKey: ['hero', name, strength],
        queryFn: () => getHeroByFiltersAction(name, strength),
        staleTime: 1000 * 60 * 5
    });
}
