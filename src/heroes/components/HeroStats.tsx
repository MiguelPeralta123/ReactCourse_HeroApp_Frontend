import { Badge } from '@/components/ui/badge'
import { Users, Heart, Zap, Trophy } from 'lucide-react'
import { HeroStatCard } from './HeroStatCard'
import { useHeroSummary } from '../hooks/useHeroSummary'
import { use } from 'react'
import { FavoritesContext } from '../context/favorites.context'

export const HeroStats = () => {
    const { data: summaryData } = useHeroSummary();

    const { count } = use(FavoritesContext);

    return <>
        {
            !summaryData && <div>Loading...</div>
        }

        {
            summaryData && <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <HeroStatCard
                    title='Total Characters'
                    icon={<Users className="h-4 w-4 text-muted-foreground" />}
                >
                    <div className="text-2xl font-bold">{summaryData.totalHeroes}</div>
                    <div className="flex gap-1 mt-2">
                        <Badge variant="secondary" className="text-xs">
                            {summaryData.heroCount} Heroes
                        </Badge>
                        <Badge variant="destructive" className="text-xs">
                            {summaryData.villainCount} Villains
                        </Badge>
                    </div>
                </HeroStatCard>

                <HeroStatCard
                    title='Favorites'
                    icon={<Heart className="h-4 w-4 text-muted-foreground" />}
                >
                    <div className="text-2xl font-bold text-red-600" data-testid="favorite-count">{count}</div>
                    <p className="text-xs text-muted-foreground" data-testid="favorite-percentage">{count * 100 / (summaryData.totalHeroes || 0)}% of total</p>
                </HeroStatCard>

                <HeroStatCard
                    title='Strongest'
                    icon={<Zap className="h-4 w-4 text-muted-foreground" />}
                >
                    <div className="text-lg font-bold">{summaryData.strongestHero.alias}</div>
                    <p className="text-xs text-muted-foreground">Strength: {summaryData.strongestHero.strength}/10</p>
                </HeroStatCard>

                <HeroStatCard
                    title='Smartest'
                    icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
                >
                    <div className="text-lg font-bold">{summaryData.smartestHero.alias}</div>
                    <p className="text-xs text-muted-foreground">Intelligence: {summaryData.smartestHero.intelligence}/10</p>
                </HeroStatCard>
            </div>
        }
    </>
}
