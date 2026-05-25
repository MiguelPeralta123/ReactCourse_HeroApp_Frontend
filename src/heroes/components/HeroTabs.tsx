import { use, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { TabsTrigger, TabsContent, Tabs, TabsList } from '@/components/ui/tabs'
import { useHeroSummary } from '../hooks/useHeroSummary';
import { FavoritesContext } from '../context/favorites.context';
import type { Hero } from '../interfaces/HeroesResponse';
import { HeroGrid } from './HeroGrid';

interface Props {
    heroes?: Hero[]
}

export const HeroTabs = ({ heroes }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const setCategory = (category: string) => {
        setSearchParams(prev => {
            prev.set('category', category);
            prev.delete('page');
            prev.delete('limit');
            return prev;
        })
    }

    const paramsCategory = searchParams.get('category') || '';
    const category = useMemo(() => {
        const validCategories = ['all', 'favorites', 'hero', 'villain'];
        return validCategories.includes(paramsCategory) ? paramsCategory : 'all';
    }, [paramsCategory]);

    const { data: summaryData } = useHeroSummary();

    const { favorites, count } = use(FavoritesContext);

    return (
        <Tabs value={category} className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all" onClick={() => setCategory("all")}>All Characters ({summaryData?.totalHeroes})</TabsTrigger>
                <TabsTrigger value="favorites" onClick={() => setCategory("favorites")}>Favorites ({count})</TabsTrigger>
                <TabsTrigger value="hero" onClick={() => setCategory("hero")}>Heroes ({summaryData?.heroCount})</TabsTrigger>
                <TabsTrigger value="villain" onClick={() => setCategory("villain")}>Villains ({summaryData?.villainCount})</TabsTrigger>
            </TabsList>

            <TabsContent value='all'>
                <HeroGrid heroes={heroes} />
            </TabsContent>

            <TabsContent value='favorites'>
                <HeroGrid heroes={favorites} />
            </TabsContent>

            <TabsContent value='hero'>
                <HeroGrid heroes={heroes} />
            </TabsContent>

            <TabsContent value='villain'>
                <HeroGrid heroes={heroes} />
            </TabsContent>
        </Tabs>
    )
}
