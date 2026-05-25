import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router'
import { getHeroAction } from '../actions/get-hero.action';

export const useHero = () => {
    const { slugId = '' } = useParams();
    return useQuery({
        queryKey: ['hero', slugId],
        queryFn: () => getHeroAction(slugId),
        staleTime: 1000 * 60 * 5
    });
}
