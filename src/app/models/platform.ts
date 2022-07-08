import { ContextualPotentialAnswer, ContextualPotentialAnswerWithChecked } from "./contextual_potential_answer";

export interface Platform {
    platform_id: number;
    platform_title: string;
    global_score: string;
    global_ranking: number;
    global_trend: number;
    platform_description: string;
    platform_logo_URL: string;
}

export interface PlatformCompleteDetails {
    platform_id: number;
    platform_title: string;
    platform_description: string;
    platform_logo_URL: string;
    flagged: Boolean;
    contextual_answers: PlatformContextualAnswers[]
}

export class PlatformCompleteDetailsClass {
    platform_id: number;
    platform_title: string;
    platform_description: string;
    platform_logo_URL: string;
    flagged: Boolean;
    contextual_answers: PlatformContextualAnswers[]
    constructor() { }
}

export interface PlatformContextualAnswers {
    question_id: number;
    question_answer_id: number;
    question_answer_title: String;
}

export interface PlatformContextualAnswersWithInfo {
    question_id: number;
    question_answer_id: number;
    question_answer_title: String;
    question_title: string;
    potential_answers: ContextualPotentialAnswer[];
}

export interface PlatformContextualWithAnswersProvied {
    question_id: number;
    question_title: string;
    question_answer_id: number;
    potential_answers: ContextualPotentialAnswerWithChecked[];
}


export interface platformTitles {
    key: string;
    title: string;
}


export interface PComparisonDataTableItemGS {
    position: string;
    platform: string;
    score: string;
    score_variaton_icon: string,
    icon: string;
}

export interface PComparisonDataTableItemDetail {
    position: string;
    platform: string;
    score: string;
    score_variaton_icon: string,
    icon: string;
    KPIsValues: any[]
}

export interface TableDataManagementPlatformKPIValues {
    platform: string;
    icon: string;
    KPIsValues: any[]
}

export interface PComparisonDataTableItemStatistics {
    platform: string;
    icon: string;
    statisticsValues: any[]
}
