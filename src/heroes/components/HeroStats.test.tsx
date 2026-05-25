import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { HeroStats } from "./HeroStats";
import { QueryClient, QueryClientProvider, type UseQueryResult } from "@tanstack/react-query";
import { useHeroSummary } from "../hooks/useHeroSummary";
import type { EstHero, SummaryResponse } from "../interfaces/SummaryResponse";
import { FavoritesProvider } from "../context/favorites.context";

vi.mock('../hooks/useHeroSummary');
const mockUseHeroSummary = vi.mocked(useHeroSummary);

const mockSummaryResponse: SummaryResponse = {
    totalHeroes: 40,
    heroCount: 30,
    villainCount: 10,
    strongestHero: {} as EstHero,
    smartestHero: {} as EstHero
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
});

const renderHeroStats = (mockData?: SummaryResponse) => {
    mockUseHeroSummary.mockReturnValue({
        data: mockData
    } as UseQueryResult<SummaryResponse, Error>);
    render(
        <QueryClientProvider client={queryClient}>
            <FavoritesProvider>
                <HeroStats />
            </FavoritesProvider>
        </QueryClientProvider>
    );
};

describe('HeroStats', () => {
    test('Should render initial state', () => {
        renderHeroStats();
        expect(screen.getByText('Loading...')).toBeDefined();
    });

    test('Should render summary with mocked data', () => {
        renderHeroStats(mockSummaryResponse);
        expect(screen.getByText('30 Heroes')).toBeDefined();
    });

    test('Should calculate percentage of favorite heroes', () => {
        localStorage.setItem('favorites', JSON.stringify([{
            "id": "1",
            "name": "Clark Kent"
        }]));

        renderHeroStats(mockSummaryResponse);

        const favoriteCount = screen.getByTestId('favorite-count');
        const favoritePercentage = screen.getByTestId('favorite-percentage');

        screen.debug(favoriteCount);
        expect(favoriteCount.innerHTML).toBe('1');

        screen.debug(favoritePercentage);
        expect(favoritePercentage.innerHTML).toContain('2.5%');
    });
});