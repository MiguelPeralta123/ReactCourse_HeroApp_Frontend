import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router";
import { useHeroesByPage } from "@/heroes/hooks/useHeroesByPage";
import { QueryClient, QueryClientProvider, type UseQueryResult } from "@tanstack/react-query";
import type { HeroesResponse } from "@/heroes/interfaces/HeroesResponse";

vi.mock('@/heroes/hooks/useHeroesByPage');
const mockUseHeroesByPage = vi.mocked(useHeroesByPage);

mockUseHeroesByPage.mockReturnValue({
    data: [] as unknown as HeroesResponse,
    isLoading: false,
    isError: false,
    isSuccess: true
} as UseQueryResult<HeroesResponse, Error>);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
});

const renderHomePage = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <QueryClientProvider client={queryClient}>
                <HomePage />
            </QueryClientProvider>
        </MemoryRouter>
    );
};

describe('HomePage', () => {
    test('Should render home page with default initial state', () => {
        const { container } = renderHomePage();
        expect(container).toMatchSnapshot();
    });

    test('Should call useHeroesByPage function with default params', () => {
        renderHomePage();
        expect(mockUseHeroesByPage).toHaveBeenCalledWith(1, 6, "all");
    });

    test('Should call useHeroesByPage function with custom params', () => {
        renderHomePage(['/?page=2&limit=10&category=villains']);
        expect(mockUseHeroesByPage).toHaveBeenCalledWith(2, 10, "villains");
    });
});