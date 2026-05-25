import { describe, expect, test, vi } from "vitest";
import { appRouter } from "./app.router";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, Outlet, RouterProvider, useParams } from "react-router";

vi.mock('@/heroes/layouts/HeroesLayout', () => ({
    HeroesLayout: () => <div data-testid="heroes-layout">
        <Outlet />
    </div>
}));

vi.mock('@/heroes/pages/home/HomePage', () => ({
    HomePage: () => <div data-testid="home-page">HomePage</div>
}));

vi.mock('@/heroes/pages/hero/HeroPage', () => ({
    HeroPage: () => {
        const { slugId = '' } = useParams();
        return <div data-testid="hero-page">HeroPage - {slugId}</div>
    }
}));

vi.mock('@/heroes/pages/search/SearchPage', () => ({
    default: () => <div data-testid="search-page">SearchPage</div>
}));

describe('App router', () => {
    test('Should return configured app router', () => {
        expect(appRouter.routes).toMatchSnapshot();
    });

    test('Should render HomePage inside HeroesLayout when navigating to root path', () => {
        render(<RouterProvider router={appRouter} />);
        expect(screen.getByTestId('heroes-layout')).toBeDefined();
        expect(screen.getByTestId('home-page')).toBeDefined();
    });

    test('Should render hero page in /heroes/:slugId', () => {
        const customRouter = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/heroes/spider-man']
        })
        render(<RouterProvider router={customRouter} />);
        expect(screen.getByTestId('hero-page').textContent).toBe('HeroPage - spider-man');
    });

    test('Should render search page in /search', async () => {
        const customRouter = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/search']
        })
        render(<RouterProvider router={customRouter} />);
        expect(await screen.findByTestId('search-page')).toBeDefined();
    });

    test('Should navigate to home page when route is unknown', () => {
        const customRouter = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/unknown-route']
        });
        render(<RouterProvider router={customRouter} />);
        expect(screen.getByTestId('home-page')).toBeDefined();
    });
});