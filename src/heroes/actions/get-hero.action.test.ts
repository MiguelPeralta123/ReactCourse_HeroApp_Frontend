import { describe, expect, test } from "vitest";
import type { Hero } from "../interfaces/HeroesResponse";
import { getHeroAction } from "./get-hero.action";

const apiUrl = import.meta.env.VITE_API_URL;

describe('getHeroAction', () => {
    test('Should get hero data with entire image URL', async () => {
        const hero: Hero = await getHeroAction('bruce-wayne');
        expect(hero).toBeDefined();
        expect(hero.image).toContain(apiUrl);
    });

    test('Should return not found if hero does not exist', async () => {
        const hero = await getHeroAction('wolverine')
            .catch(error => {
                expect(error.status).toBe(404);
            });
        expect(hero).toBeFalsy();
    });
});