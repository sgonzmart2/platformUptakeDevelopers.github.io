export interface Statistics {
    statistics_id: number,
    title: string,
    larger_is_better: boolean,
    is_percentage: boolean
}


export class StatisticsValue implements Statistics {
    statistics_id: number;
    title: string;
    larger_is_better: boolean;
    is_percentage: boolean;
    constructor() { }
}

export interface StatisticsValues {
    statistics_id: number,
    title: string,
    larger_is_better: boolean,
    is_percentage: boolean,
    platform_id: number,
    period_id: number,
    value: string
}

export class MyStatisticsValues implements StatisticsValues {
    statistics_id: number;
    title: string;
    larger_is_better: boolean;
    is_percentage: boolean;
    platform_id: number;
    period_id: number;
    value: string;
    constructor() { }
}

export interface NewStatistic {
    statistics_id: number
    statistics_title: string,
    statistics_description: string,
    ispercentage: boolean,
    largerisbetter: boolean
}

export interface NewStatisticValue {
    period_id: number,
    platforms_with_statistics: NewStatisticsValueItemArrayPlatforms[]

}

export interface NewStatisticsValueItemArrayPlatforms {
    platform_id: number,
    statistics_values: newstatisticsListValues[]
}

export interface newstatisticsListValues {
    statistics_id: number,
    statistics_value: number
}