import { render } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import SearchPage from "./SearchPage";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider, type UseQueryResult } from "@tanstack/react-query";
import { useHeroByFilters } from "@/heroes/hooks/useHeroByFilters";
import type { Hero } from "@/heroes/interfaces/HeroesResponse";

vi.mock('@/heroes/hooks/useHeroByFilters');
const mockUseHeroByFilters = vi.mocked(useHeroByFilters);

mockUseHeroByFilters.mockReturnValue({
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
} as unknown as UseQueryResult<Hero[], Error>);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
});

const renderSearchPage = (initialEntries: string[] = ['/search']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <QueryClientProvider client={queryClient}>
                <SearchPage />
            </QueryClientProvider>
        </MemoryRouter>
    );
};

describe('SearchPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('Should render search page with default initial state', () => {
        const { container } = renderSearchPage();
        expect(container).toMatchSnapshot();
    });

    test('Should call search action with custom params', () => {
        renderSearchPage(['/search?name=spiderman&strength=8']);
        expect(mockUseHeroByFilters).toHaveBeenCalledWith("spiderman", "8");
    });
});