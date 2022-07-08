import { KPI_category } from '../models/kpi_category';
import { KPI_cluster } from '../models/kpi_cluster';
import { KPI_dimension } from '../models/kpi_dimension';
import { Platform } from '../models/platform';

export let KPICategories: KPI_category[] = new Array()
export let KPIDimensions: KPI_dimension[] = new Array()
export let KPIClusters: KPI_cluster[] = new Array()

export let platformSelected: Platform[] = new Array()
export let userClusterSelected: number[] = new Array()
export let num_platforms: number[] = new Array()

export let userConfig = [];
export let toolConfig = [];
export let selectedPeriod: number[] = new Array()