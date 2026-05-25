import { describe, expect, test } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { SearchFilters } from "./SearchFilters";

const renderSearchFiltersWithRouter = (initialEntries: string[] = ['']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <SearchFilters />
        </MemoryRouter>
    );
};

describe('SearchFilters', () => {
    test('Should render initial state', () => {
        renderSearchFiltersWithRouter();
        expect(screen.getByText('Filters')).toBeDefined();
    });

    test('Should update name param when enter key is pressed', () => {
        const hero = 'batman';
        renderSearchFiltersWithRouter([`?name=${hero}`]);
        const inputName = screen.getByTestId('inputName');
        expect(inputName.getAttribute('value')).toBe(hero);
    });

    test('Should update name param when enter key is pressed', () => {
        const hero = 'spiderman';
        renderSearchFiltersWithRouter();
        const inputName = screen.getByTestId('inputName');
        fireEvent.change(inputName, { target: { value: hero } });
        fireEvent.keyDown(inputName, { key: 'Enter' });
        expect(inputName.getAttribute('value')).toBe(hero);
    });

    test('Should update strength param when left/right arrow is pressed', () => {
        renderSearchFiltersWithRouter(['?strength=5&show-advanced-filters=true']);
        const strengthSliderContainer = screen.getByTestId('strength-slider');

        const strengthSlider = within(strengthSliderContainer).getByDisplayValue('5');
        expect(strengthSlider).toBeDefined();

        fireEvent.keyDown(strengthSlider, { key: 'ArrowRight' });
        expect(strengthSlider.getAttribute('value')).toBe('6');
    });
});