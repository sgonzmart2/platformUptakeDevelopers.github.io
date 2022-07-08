import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeriodService } from '../api/period.service';
import *  as constants from '../../utilities/constants';
import { newPeriod } from 'src/app/models/period';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';

@Injectable({
  providedIn: 'root'
})
export class PeriodDoaService {

  constructor(private http: HttpClient,
    private secureStorage: EncryptedStorageService) { }

  private getPeriodTypes() {
    let service: PeriodService = new PeriodService(this.http, null, null);
    return service.getPeriodsType();
  }

  public getPeriodValuesList() {
    let service: PeriodService = new PeriodService(this.http, null, null);
    return service.getPeriodsValues();
  }

  updatePeriodsType() {
    let listPeriodTypes = [];
    this.getPeriodTypes().subscribe(
      response => {
        listPeriodTypes = response['measurement_periods'];
        let finalListPeriodTypes = []
        listPeriodTypes.forEach(element => {
          if (element.periodtype_title === "KPI measurement") {
            finalListPeriodTypes.push(element);
          }
          else if (element.periodtype_title === "Statistics measurement") {
            finalListPeriodTypes.push(element);
          }
        });
        this.secureStorage.secureLocalStorage(constants.lSN_periodTypes, JSON.stringify(finalListPeriodTypes))
      });
  }

  public updateAllPeriods() {
    return this.getPeriodValuesList().subscribe(
      response => {
        let list = response['measurement_periods'];
        let finalList = []
        list.forEach(element => {
          if (element.period_type_title === "KPI measurement") {
            finalList.push(element);
          }
          else if (element.period_type_title === "Statistics measurement") {
            finalList.push(element);
          }
        });
        this.secureStorage.secureLocalStorage(constants.lSN_allMeasurementsPeriod, JSON.stringify(finalList))
      });
  }

  updatePeriods() {
    let listPeriodKPIValues = [];
    let listPeriodStatistics = [];
    //let listPeriodQuestions = [];
    //let listPeriodKPINormalization = [];
    this.getPeriodValuesList().subscribe(
      response => {
        let list = response['measurement_periods'];
        list.forEach(element => {
          if (element.period_type_title === "KPI measurement") {
            listPeriodKPIValues.push(element);
          }
          else if (element.period_type_title === "Statistics measurement") {
            listPeriodStatistics.push(element);
          }
          /*else if (element.period_type_title === "Question answer measurement") {
            listPeriodQuestions.push(element);
          }
          else if (element.period_type_title === "KPI normalization") {
            listPeriodKPINormalization.push(element);
          }*/
        });

        //Sort arrays by from_date descending
        listPeriodKPIValues.sort((v1, v2) => {
          return <any>new Date(v2.from_date) - <any>new Date(v1.from_date);
        })

        listPeriodStatistics.sort((v1, v2) => {
          return <any>new Date(v2.from_date) - <any>new Date(v1.from_date);
        })

        /*listPeriodQuestions.sort((v1, v2) => {
          return <any>new Date(v2.from_date) - <any>new Date(v1.from_date);
        })

        listPeriodKPINormalization.sort((v1, v2) => {
          return <any>new Date(v2.from_date) - <any>new Date(v1.from_date);
        })*/

        //Save in the localstorage
        this.secureStorage.secureLocalStorage(constants.lSN_measurementsPeriodKPIValues, JSON.stringify(listPeriodKPIValues))
        //this.secureStorage.secureLocalStorage(constants.lSN_measurementsPeriodKPINormalizationValues, JSON.stringify(listPeriodKPINormalization))
        this.secureStorage.secureLocalStorage(constants.lSN_measurementsPeriodStatisticsValues, JSON.stringify(listPeriodStatistics))
        //this.secureStorage.secureLocalStorage(constants.lSN_measurementsPeriodQuestionnairesValues, JSON.stringify(listPeriodQuestions))
      });
  }

  insertNewPeriod(body: newPeriod) {
    let service: PeriodService = new PeriodService(this.http, null, null);
    return service.insertNewPeriod(body)
  }
}
