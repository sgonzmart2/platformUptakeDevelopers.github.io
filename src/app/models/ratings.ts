export interface Rating {
    developerquestion_id: number;
    developerquestion_title: string;
    developerquestion_type_id: number;
    developerquestion_category_id: number;
    developerquestion_type_abb: string;
    mean_rating: number;
    numberofratings: number;
    rating_details: Rating_details[];
    hastext: boolean;
}

export interface Rating_details {
    rating: number;
    numberofappearances: number;
}

export interface Comments {
    feedback_date: Date;
    feedback_rating: number;
    feedback_text: string;
}

export interface DeveloperFeedbackQuestions {
    developerquestion_id: number;
    developerquestion_title: string;
    developerquestion_category_id: number;
    developerquestion_orderofappearance: number;
    answers: DeveloperQuestionsAnswers[];
}

export interface DeveloperQuestionsAnswers {
    answer_title: string;
    answer_orderofappearance: number;
    answer_count: number
}
