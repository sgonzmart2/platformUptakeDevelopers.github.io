export interface Period {
    measurement_period_id: number;
    measurement_period_title: string;
    period_type: number;
    flagged: boolean;
    period_type_title: string;
    from_date: Date;
    until_date: Date;
}

export class PeriodClass implements Period {
    measurement_period_id: number;
    flagged: boolean;
    isReady: boolean;
    measurement_period_title: string;
    period_type: number;
    period_type_title: string;
    from_date: Date;
    until_date: Date;
    constructor() { }
}

export interface newPeriod {
    period_id: number,
    period_title: string,
    flagged: boolean,
    period_datefrom: string,
    period_dateuntil: string,
    periodtype_id: number;
}