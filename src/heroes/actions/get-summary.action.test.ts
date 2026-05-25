import { describe, expect, test } from "vitest";
import { getSummaryAction } from "./get-summary.action";
import type { SummaryResponse } from "../interfaces/SummaryResponse";

describe('getSummaryAction', () => {
    test('Should get summary data', async () => {
        const summaryData: SummaryResponse = await getSummaryAction();
        expect(summaryData).toBeDefined();
        expect(summaryData.totalHeroes).toBeGreaterThan(0);
    });
});