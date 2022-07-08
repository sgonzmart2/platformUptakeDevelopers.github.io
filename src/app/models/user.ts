import { KPI_weightsToSend, KPI_weights } from "./kpis";

export interface user {
    role_id: number;
    role_title: string;
    role_abbreviation: string;
    language_title: string;
    corresponding_platform_id: number[];
    language_id: number;
    custom_KPI_weights: KPI_weights[]
}

export interface userWeights {
    user_id: string,
    tooltype_id: 1,
    KPI_weights: KPI_weightsToSend[]
}