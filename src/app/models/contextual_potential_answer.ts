export interface ContextualPotentialAnswer {
    answer_id: number;
    answer_title: string;
    answer_orderofappearance: number
}

export interface ContextualPotentialAnswerWithChecked {
    answer_id: number;
    answer_title: string;
    answer_orderofappearance: number;
    checked: Boolean;
}