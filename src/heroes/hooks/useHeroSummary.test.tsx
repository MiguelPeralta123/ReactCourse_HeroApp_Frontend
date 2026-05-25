import { beforeEach, describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { useHeroSummary } from "./useHeroSummary";
import { getSummaryAction } from "../actions/get-summary.action";
import type { EstHero } from "../interfaces/SummaryResponse";

vi.mock('../actions/get-summary.action', () => ({
    getSummaryAction: vi.fn()
}));
const mockGetSummaryAction = vi.mocked(getSummaryAction);

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

describe('useHeroSummary', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('Should return an initial state', () => {
        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: getQueryClientProvider()
        });
        expect(result).toBeTruthy();
        expect(result.current.isLoading).toBeTruthy();
        expect(result.current.error).toBeFalsy();
    });

    test('Should return heroes summary when resolved', async () => {
        const mockResponse = {
            totalHeroes: 10,
            strongestHero: {
                id: 1,
                name: 'Clark Kent'
            } as unknown as EstHero,
            smartestHero: {
                id: 2,
                name: 'Bruce Wayne'
            } as unknown as EstHero,
            heroCount: 8,
            villainCount: 2
        };
        mockGetSummaryAction.mockResolvedValue(mockResponse);

        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: getQueryClientProvider()
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(result.current.isError).toBeFalsy();
        expect(result.current.data?.heroCount).toBeGreaterThan(0);
    });

    test('Should return an error when failed', async () => {
        const mockError = new Error('API call failed');
        mockGetSummaryAction.mockRejectedValue(mockError);

        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: getQueryClientProvider()
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });

        expect(result.current.isSuccess).toBeFalsy();
        expect(result.current.error?.message).toBe('API call failed');
    });
});