import { describe, test, expect } from 'vitest';
import { heroApi } from './heroes.api';

const baseURL = import.meta.env.VITE_API_URL;

describe('heroApi', () => {
    test('Should point to test server', () => {
        expect(heroApi).toBeDefined();
        expect(heroApi.defaults.baseURL).toBe(baseURL);
        expect(baseURL).toContain('3000');
    })
});