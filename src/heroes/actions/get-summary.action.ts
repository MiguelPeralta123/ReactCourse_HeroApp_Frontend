import { heroApi } from "../api/heroes.api"
import type { SummaryResponse } from "../interfaces/SummaryResponse";

export const getSummaryAction = async (): Promise<SummaryResponse> => {
    const { data } = await heroApi.get('/api/heroes/summary');
    return data;
}