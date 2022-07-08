import { Platform } from 'src/app/models/platform';
import { Component } from '@angular/core';
import *  as constants from '../utilities/constants';
import * as config_variables from '../utilities/config_variables';
import { ContextualQuestion } from 'src/app/models/contextual_question';
import { Period } from '../models/period';
import { EncryptedStorageService } from './encryptedStorageService';
import { KPIs } from '../models/kpis';

@Component({
    selector: 'functions',
    template: ``,
})
export class FunctionsComponent {

    public getNormalValueCircunferenceComplete(circumference, normalValue) {
        let value
        if (normalValue == 0) {
            value = 0;
        }
        else if (normalValue == 1) {
            value = 25;
        }
        else if (normalValue == 2) {
            value = 50;
        }
        else if (normalValue == 3) {
            value = 75;
        }
        else if (normalValue == 4) {
            value = 100;
        }

        const progress = value / 100;
        return circumference * (1 - progress);
    }

    getPlatformIconVariation(variation: number) {
        if (variation == 2) {
            return constants.icon_score_up;
        }
        else if (variation == 0) {
            return constants.icon_score_down;
        }
        else if (variation == 1) {
            return constants.icon_score_equal;
        }
        /*else if (variation == -1) {
            return constants.icon_score_unknow;
        }*/
    }

    getKPIDimensionIdByAbbreviation(abb): number {
        let id: number = 0;
        let secureStorage = new EncryptedStorageService();
        let listDimensions = JSON.parse(secureStorage.decryptLocalSecureStorage(constants.lSN_dimension));

        listDimensions.forEach(dim => {
            if (abb == dim.dimension_abbreviation) {
                id = dim.dimension_id
            }
        });
        return id;
    }

    getKPIDetailsById(kpi_id): KPIs {
        let kpiToReturn
        let secureStorage = new EncryptedStorageService();
        let listKPI = JSON.parse(secureStorage.decryptLocalSecureStorage(constants.lSN_KPIs_list));
        listKPI.forEach(kpi => {
            if (kpi.kpi_id == kpi_id) {
                kpiToReturn = kpi;
            }
        })
        return kpiToReturn
    }

    getKPIClusterIdByAbbreviation(abb): number {
        let id: number = 0;
        let secureStorage = new EncryptedStorageService();
        let listClusters = JSON.parse(secureStorage.decryptLocalSecureStorage(constants.lSN_cluster));

        listClusters.forEach(cluster => {
            if (abb == cluster.cluster_abbreviation) {
                id = cluster.cluster_id
            }
        });
        return id;
    }

    getRol(value) {
        switch (value) {
            case 1:
                return constants.rol.GAdmin;
            case 2:
                return constants.rol.PAdmin;
            case 3:
                return constants.rol.DAdmin;
            case 4:
                return constants.rol.Own;
            case 5:
                return constants.rol.Dev;
            case 6:
                return constants.rol.Other;
        }
    }

    getTypeDeveloperQ(id): string {
        let abb;
        let secureStorage = new EncryptedStorageService();
        let listDeveloperQTypes = JSON.parse(secureStorage.decryptLocalSecureStorage(constants.lSN_developer_question_types));
        listDeveloperQTypes.forEach(i => {
            if (i.devq_type_id == id)
                abb = i.devq_type_abbreviation;
        })
        return abb;
    }

    setSelectPlatform(plt: Platform) {
        config_variables.platformSelected[0] = plt;
    }

    getPlatformSelected() {
        return config_variables.platformSelected[0];
    }

    setClusterSelected(index: number) {
        config_variables.userClusterSelected[0] = index;
    }

    getClusterSelected() {
        return config_variables.userClusterSelected[0];
    }

    getKPIPeriodTitleForChart(id): string {
        let periodTitle
        let f = new FunctionsComponent()
        let periods = f.getValidKPIValuesPeriods();
        periods.forEach(period => {
            if (id == period.measurement_period_id) {
                periodTitle = period.from_date + "  to  " + period.until_date;
            }

        })
        return periodTitle
    }

    getStatisticsPeriodTitleForChart(id): string {
        let periodTitle;
        let secureStorage = new EncryptedStorageService();
        let periods = JSON.parse(secureStorage.decryptLocalSecureStorage(constants.lSN_measurementsPeriodStatisticsValues));
        periods.forEach(period => {
            if (id == period.measurement_period_id) {
                periodTitle = period.from_date + "  to  " + period.until_date;
            }

        })
        return periodTitle
    }

    getTypeDimensionKPIsList(type_kpi) {
        let secureStorage = new EncryptedStorageService();
        let KPIs_list = JSON.parse(secureStorage.decryptLocalSecureStorage(constants.lSN_KPIs_list));
        let listTypeKPIs = []
        let dim_id = this.getKPIDimensionIdByAbbreviation(type_kpi);
        KPIs_list.forEach(kpi => {
            if (kpi.dimension_id == dim_id) {
                listTypeKPIs.push(kpi);
            }
        });

        return listTypeKPIs
    }

    getTypeClusterKPIsList(cluster_id) {
        let secureStorage = new EncryptedStorageService();
        let KPIs_list = JSON.parse(secureStorage.decryptLocalSecureStorage(constants.lSN_KPIs_list));
        let listTypeKPIs = []
        KPIs_list.forEach(kpi => {
            if (kpi.cluster_id == cluster_id) {
                listTypeKPIs.push(kpi);
            }
        });
        return listTypeKPIs
    }

    getValidContextualQuestions() {
        let secureStorage = new EncryptedStorageService();
        let listContextualQuestions: ContextualQuestion[] = JSON.parse(secureStorage.decryptLocalSecureStorage(constants.lSN_contextualQuestions));
        let validContextualQuestions: ContextualQuestion[] = [];
        listContextualQuestions.forEach(question => {
            if (!question.flagged)
                validContextualQuestions.push(question)
        })

        validContextualQuestions.sort(function (a, b) {
            return a.question_orderofappearance - b.question_orderofappearance;
        });

        return validContextualQuestions;
    }

    getValidKPIValuesPeriods() {
        let secureStorage = new EncryptedStorageService();
        let periods: Period[] = JSON.parse(secureStorage.decryptLocalSecureStorage(constants.lSN_measurementsPeriodKPIValues));

        let validPeriods: Period[] = [];
        periods.forEach(p => {
            if (!p.flagged)
                validPeriods.push(p)
        })

        return validPeriods;
    }

    getValidStatisticsValuesPeriods() {
        let secureStorage = new EncryptedStorageService();
        let periods: Period[] = JSON.parse(secureStorage.decryptLocalSecureStorage(constants.lSN_measurementsPeriodStatisticsValues));

        let validPeriods: Period[] = [];
        periods.forEach(p => {
            if (!p.flagged)
                validPeriods.push(p)
        })

        return validPeriods;
    }

    getMeasurementsListByType(allPeriods: Period[], condition) {
        let periodsValid: Period[] = [];
        allPeriods.forEach(i => {
            if (i.period_type_title == condition) {
                periodsValid.push(i);
            }
        })
        return periodsValid;
    }
}

