import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useHeroesByPage } from "./useHeroesByPage";
import { getHeroesAction } from "../actions/get-heroes.action";

vi.mock('../actions/get-heroes.action', () => ({
    getHeroesAction: vi.fn()
}));
const mockGetHeroesAction = vi.mocked(getHeroesAction);

const getQueryClientProvider = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    });

    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('useHeroesByPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('Should return initial state', () => {
        const { result } = renderHook(() => useHeroesByPage(1, 6, 'all'), {
            wrapper: getQueryClientProvider()
        });
        expect(result.current.isLoading).toBeTruthy();
    });

    test('Should return array of heroes when resolved', async () => {
        const mockResponse = {
            total: 20,
            pages: 4,
            heroes: []
        };
        mockGetHeroesAction.mockResolvedValue(mockResponse);

        const { result } = renderHook(() => useHeroesByPage(1, 6, 'all'), {
            wrapper: getQueryClientProvider()
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });
        expect(result.current.status).toBe('success');
        expect(mockGetHeroesAction).toHaveBeenCalledWith(1, 6, 'all');
    });

    test('Should return error when rejected', async () => {
        const mockError = new Error('API call failed');
        mockGetHeroesAction.mockRejectedValue(mockError);

        const { result } = renderHook(() => useHeroesByPage(1, 6, 'all'), {
            wrapper: getQueryClientProvider()
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });

        expect(result.current.error?.message).toBe('API call failed');
    });
});