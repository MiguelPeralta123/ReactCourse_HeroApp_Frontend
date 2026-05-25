import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { SearchFilters } from './ui/SearchFilters';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';
import { useHeroByFilters } from '@/heroes/hooks/useHeroByFilters';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { useSearchParams } from 'react-router';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || '';
  const strength = searchParams.get('strength') || '';

  const { data: heroesData } = useHeroByFilters(name, strength);

  return (
    <>
      <CustomBreadcrumbs currentPage='Search' breadcrumbs={[
        {
          name: 'Home',
          url: '/'
        }
      ]} />

      <CustomJumbotron title='Search Superheroes' subtitle='Discover, explore, and manage your favorite superheroes and villains' />

      <HeroStats />

      <SearchFilters />

      <HeroGrid heroes={heroesData} />
    </>
  )
}

export default SearchPage;