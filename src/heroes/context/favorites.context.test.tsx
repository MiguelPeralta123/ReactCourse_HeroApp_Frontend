import { use } from "react";
import { beforeEach, describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { FavoritesContext, FavoritesProvider } from "./favorites.context";
import type { Hero } from "../interfaces/HeroesResponse";

const hero = {
    id: '1',
    name: 'Spiderman'
} as Hero;

export const FavoritesContextTest = () => {
    const { count, favorites, toggleFavorite, isFavorite } = use(FavoritesContext);

    return (
        <div>
            <div data-testid='count'>{count}</div>
            <ul data-testid='favorites'>
                {
                    favorites.map((hero, index) => <li key={index}>{hero.alias}</li>)
                }
            </ul>
            <button data-testid='btn-toggle' onClick={() => toggleFavorite(hero)}>Toggle Favorite</button>
            <div data-testid='is-favorite'>{isFavorite(hero.id).toString()}</div>
        </div>
    )
}

export const FavoritesProviderTest = () => {
    return render(
        <FavoritesProvider>
            <FavoritesContextTest />
        </FavoritesProvider>
    )
}

describe('favoritesContext', () => {
    beforeEach(() => {
        FavoritesProviderTest();
    });

    test('Should render context with initial state', () => {
        expect(screen.getByTestId('count').textContent).toBe('0');
        expect(screen.getByTestId('favorites').children.length).toBe(0);
    });

    test('Should toggle favorite status and add/remove hero from favorite list', () => {
        const btnToggle = screen.getByTestId('btn-toggle');

        fireEvent.click(btnToggle);
        expect(screen.getByTestId('count').textContent).toBe('1');
        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(localStorage.getItem('favorites')).toBe('[{"id":"1","name":"Spiderman"}]');

        fireEvent.click(btnToggle);
        expect(screen.getByTestId('count').textContent).toBe('0');
        expect(screen.getByTestId('is-favorite').textContent).toBe('false');
        expect(localStorage.getItem('favorites')).toBe('[]');
    })
});