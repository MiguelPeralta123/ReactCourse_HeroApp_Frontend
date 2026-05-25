import { beforeEach, describe, expect, test } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";
import { heroApi } from "../api/heroes.api";
import { getHeroesAction } from "./get-heroes.action";

describe('getHeroesAction', () => {
    const heroApiMock = new AxiosMockAdapter(heroApi);

    beforeEach(() => {
        heroApiMock.reset();
    });

    test('Should return first set of heroes', async () => {
        heroApiMock.onGet('/api/heroes').reply(200, {
            total: 25,
            pages: 5,
            heroes: [
                {
                    image: '1.jpg'
                },
                {
                    image: '2.jpg'
                }
            ]
        });

        const result = await getHeroesAction(1, 5, 'all');

        expect(result).toStrictEqual({
            total: 25,
            pages: 5,
            heroes: [{ image: '1.jpg' }, { image: '2.jpg' }]
        });
    });

    test('Should return first set of heroes when page is not a number', async () => {
        heroApiMock.onGet('/api/heroes').reply(200, {
            total: 10,
            pages: 2,
            heroes: [
                {
                    image: '1.jpg'
                },
                {
                    image: '2.jpg'
                }
            ]
        });

        const result = await getHeroesAction('' as unknown as number, '' as unknown as number, '');

        expect(result).toStrictEqual({
            total: 10,
            pages: 2,
            heroes: [{ image: '1.jpg' }, { image: '2.jpg' }]
        });
    });
});