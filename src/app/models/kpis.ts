export interface KPIs {
    kpi_id: number;
    title: string;
    description: string;
    unit_of_measurement: string;
    category_id: number;
    category_title: string;
    dimension_id: number;
    dimension_title: string;
    cluster_id: number;
    cluster_title: string;
    default_weight: number;
    complete_id: string;
    zero_left: number;
    zero_right: number;
    one_left: number;
    one_right: number;
    two_left: number;
    two_right: number;
    three_left: number;
    three_right: number;
    four_left: number;
    four_right: number;
    larger_is_better: boolean;
    qualitative_values: QCValues[];
    qualValZero: string;
    qualValOne: string;
    qualValTwo: string;
    qualValThree: string;
    qualValFour: string;
}

export class KPIsClass implements KPIs {
    zero_left: number;
    complete_id: string;
    zero_right: number;
    one_left: number;
    one_right: number;
    two_left: number;
    two_right: number;
    three_left: number;
    three_right: number;
    four_left: number;
    four_right: number;
    category_id: number;
    category_title: string;
    cluster_id: number;
    cluster_title: string;
    default_weight: number;
    description: string;
    dimension_id: number;
    dimension_title: string;
    kpi_id: number;
    larger_is_better: boolean;
    qualitative_values: QCValues[]
    title: string;
    unit_of_measurement: string;
    qualValZero: string;
    qualValOne: string;
    qualValTwo: string;
    qualValThree: string;
    qualValFour: string;
    constructor() { }
}

export interface KPIsValues {
    kpi_id: number;
    platform_id: number;
    period_id: number;
    title: string;
    unit_of_measurement: string;
    original_value: string;
    normalized_value: number;
    default_weight: number;
    user_weight: number
    description: string;
    dashoffset: number;
}

export class MyKPIsValues implements KPIsValues {
    kpi_id: number;
    platform_id: number;
    period_id: number;
    title: string;
    unit_of_measurement: string;
    original_value: string;
    normalized_value: number;
    default_weight: number;
    user_weight: number
    description: string;
    dashoffset: number;
    constructor() { }
}

export interface kpiMonitoringDataTable {
    KPI_id: number;
    KPI_title: string;
    KPI_description: string;
    original_value: any;
    normalized_value: number;
    default_weight: number;
    user_weight: number;
    hasUserWeigh: boolean;
    unit_of_measurement: string
}

export interface NewKPIValue {
    period_id: number;
    platforms_with_kpis: NewKPIValueItemArrayPlatforms[]

}

export interface NewKPIValueItemArrayPlatforms {
    platform_id: number;
    KPI_values: newKPIVALUEListValues[]
}

export interface newKPIVALUEListValues {
    kpi_id: number;
    kpi_value: any
}

export interface KPI_weights {
    kpi_id: number;
    weight: number;
}

export interface KPI_weightsToSend {
    KPI_id: number;
    weight: number;
}

export interface QCValues {
    normalizedvalue: number
    originalvalue: string
};

