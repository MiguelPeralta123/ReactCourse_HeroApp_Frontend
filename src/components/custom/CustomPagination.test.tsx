import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CustomPagination } from "./CustomPagination";
import { MemoryRouter } from "react-router";
import type { JSX } from "react";

const renderWithRouter = (children: JSX.Element, initialEntries?: string[]) => {
    render(<MemoryRouter initialEntries={initialEntries}>
        {children}
    </MemoryRouter>);
};

describe('CustomPagination', () => {
    test('Should render initial state of custom pagination', () => {
        renderWithRouter(<CustomPagination pages={5} />);
        expect(screen.getByText('Previous')).toBeDefined();
        expect(screen.getByText('1')).toBeDefined();
        expect(screen.getByText('Next')).toBeDefined();
    });

    test('Should disable previous button when the page is the first one', () => {
        renderWithRouter(<CustomPagination pages={5} />);
        expect(screen.getByText('Previous').getAttributeNames()).toContain('disabled');
    });

    test('Should disable next button then the page is the last one', () => {
        renderWithRouter(<CustomPagination pages={5} />, ['/?page=5']);
        expect(screen.getByText('Next').getAttributeNames()).toContain('disabled');
    });

    test('Should highlight only the current page button', () => {
        renderWithRouter(<CustomPagination pages={5} />, ['/?page=3']);
        // Styles for variant outline
        expect(screen.getByText('2').getAttribute('class')).toContain('border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:bg-transparent dark:hover:bg-input/30');
        // Styles for variant default
        expect(screen.getByText('3').getAttribute('class')).toContain('bg-primary text-primary-foreground hover:bg-primary/80');
    });
});