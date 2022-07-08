import * as CryptoJS from 'crypto-js';

const SECRET_KEY_constants = 'LST2021PlatformUptakeEUSpain';
export const user_id = "PU_" + CryptoJS.SHA1("user_id", SECRET_KEY_constants).toString();;
export const user_info = "PU_" + CryptoJS.SHA1("user_info", SECRET_KEY_constants).toString();
export enum KPI_cluster { PEU = "PEU", TP = "TP", EUC = "EUC", GOV = "GOV" };
export enum KPI_dimension { T = "T", B = "B", C = "C" };
export enum rol { GAdmin, PAdmin, DAdmin, Own, Dev, Other };

export enum type_KPI { dimension = "dimension", cluster = "cluster" };

//localstorage names
export const lSN_cluster = "PU_" + CryptoJS.SHA1("cluster", SECRET_KEY_constants).toString();
export const lSN_dimension = "PU_" + CryptoJS.SHA1("dimension", SECRET_KEY_constants).toString();
export const lSN_category = "PU_" + CryptoJS.SHA1("category", SECRET_KEY_constants).toString();
export const lSN_periodTypes = "PU_" + CryptoJS.SHA1("periodTypes", SECRET_KEY_constants).toString();
export const lSN_allMeasurementsPeriod = "PU_" + CryptoJS.SHA1("allMeasurementsPeriod", SECRET_KEY_constants).toString();
export const lSN_measurementsPeriodKPIValues = "PU_" + CryptoJS.SHA1("periodKPIValues", SECRET_KEY_constants).toString();
export const lSN_measurementsPeriodStatisticsValues = "PU_" + CryptoJS.SHA1("periodStatisticsValues", SECRET_KEY_constants).toString();
export const lSN_measurementsPeriodKPINormalizationValues = "PU_" + CryptoJS.SHA1("periodKPINormalizationValues", SECRET_KEY_constants).toString();
export const lSN_measurementsPeriodQuestionnairesValues = "PU_" + CryptoJS.SHA1("periodQuestionnairesValues", SECRET_KEY_constants).toString();
export const lSN_platformsList = "PU_" + CryptoJS.SHA1("platformsList", SECRET_KEY_constants).toString();
export const lSN_numberPlatform = "PU_" + CryptoJS.SHA1("numberOfPlatforms", SECRET_KEY_constants).toString();
export const lSN_KPIs_list = "PU_" + CryptoJS.SHA1("KPIs_list", SECRET_KEY_constants).toString();
export const lSN_statisticsTypes = "PU_" + CryptoJS.SHA1("statisticsTypes", SECRET_KEY_constants).toString();
export const lSN_contextualQuestions = "PU_" + CryptoJS.SHA1("contextualQuestions", SECRET_KEY_constants).toString();
export const lSN_developer_question_types = "PU_" + CryptoJS.SHA1("developerQuestionTypes", SECRET_KEY_constants).toString();

/*   icons   */
export const icon_score_down = '/assets/icons/score_down.png'
export const icon_score_up = '/assets/icons/score_up.png';
export const icon_score_equal = '/assets/icons/equal.png';
export const icon_score_unknow = '/assets/icons/score_unknow.png';

// PDF USER MANUAL
export const user_manual = '/assets/manual/User manual Providers tool.pdf'