import { useSearchParams } from "react-router"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"
import { HeroTabs } from "@/heroes/components/HeroTabs"
import { useHeroesByPage } from "@/heroes/hooks/useHeroesByPage"

export const HomePage = () => {
  const [searchParams] = useSearchParams();

  const { data: heroesData } = useHeroesByPage(
    Number(searchParams.get('page')) || 1,
    Number(searchParams.get('limit')) || 6,
    searchParams.get('category') || 'all'
  );

  return (
    <>
      <CustomBreadcrumbs currentPage="Home" />

      <CustomJumbotron title="Superhero Universe" subtitle="Discover, explore, and manage your favorite superheroes and villains" />

      <HeroStats />

      <HeroTabs heroes={heroesData?.heroes} />

      <CustomPagination pages={heroesData?.pages || 1} />
    </>
  )
}