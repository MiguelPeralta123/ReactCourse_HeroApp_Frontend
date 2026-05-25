import { createContext, useEffect, useState, type PropsWithChildren } from 'react'
import type { Hero } from '../interfaces/HeroesResponse'

interface IFavoritesContext {
    favorites: Hero[],
    count: number,
    toggleFavorite: (hero: Hero) => void,
    isFavorite: (id: string) => boolean
}

export const FavoritesContext = createContext({} as IFavoritesContext);

const getFavoritesFromLocalStorage = (): Hero[] => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

export const FavoritesProvider = ({ children }: PropsWithChildren) => {
    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage());

    const isFavorite = (id: string): boolean => {
        return favorites.some(favorite => favorite.id === id);
    }

    const toggleFavorite = (hero: Hero) => {
        if (isFavorite(hero.id)) {
            setFavorites(favorites.filter(favorite => favorite.id !== hero.id));
            return;
        }
        setFavorites(prev => ([
            ...prev,
            hero
        ]));
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <FavoritesContext
            value={{
                favorites,
                count: favorites.length,
                toggleFavorite,
                isFavorite
            }}
        >
            {children}
        </FavoritesContext>
    )
}
