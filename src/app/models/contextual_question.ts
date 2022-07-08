import { ContextualPotentialAnswer } from "./contextual_potential_answer";

export interface ContextualQuestion {
    question_id: number;
    question_title: string;
    question_alternativetitle: string;
    question_created: Date;
    recommendation: boolean;
    nrofanswers: number;
    question_orderofappearance: number;
    flagged: boolean;
    potential_answers: ContextualPotentialAnswer[];
    originalOrder: number;
}

export interface ContextualQuestionToSave {
    question_id: number;
    question_title: string;
    question_alternativetitle: string;
    question_created: Date;
    recommendation: boolean;
    question_nrofanswers: number;
    question_orderofappearance: number;
    flagged: boolean;
    potential_answers: ContextualPotentialAnswer[];
    originalOrder: number;
}

export class ContextualQuestionClass {
    question_id: number;
    question_title: string;
    question_alternativetitle: string;
    question_created: Date;
    recommendation: boolean;
    nrofanswers: number;
    question_orderofappearance: number;
    flagged: boolean;
    potential_answers: ContextualPotentialAnswer[];
    originalOrder: number;
    constructor() { }
}

export interface saveOrderArrayCQ {
    questions_order: itemSaveOrderCQ[]
}

export interface itemSaveOrderCQ {
    question_id: number;
    orderofappearance: number;
}