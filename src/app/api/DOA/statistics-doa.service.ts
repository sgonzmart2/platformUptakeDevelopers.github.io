import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatisticsService } from '../api/statistics.service';
import *  as constants from '../../utilities/constants';
import { NewStatistic, NewStatisticValue } from 'src/app/models/statistics';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';

@Injectable({
  providedIn: 'root'
})
export class StatisticsDOAService {

  statisticsService: StatisticsService;
  constructor(private http: HttpClient,
    private secureStorage: EncryptedStorageService) {
    this.statisticsService = new StatisticsService(this.http, null, null);
  }

  private getStatisticsTypes() {

    return this.statisticsService.getStatisticsType();
  }

  public getTypeOfStatistics() {
    let statisticsList = [];
    this.getStatisticsTypes().subscribe(
      response => {
        statisticsList = response['statistics_items'];
        this.secureStorage.secureLocalStorage(constants.lSN_statisticsTypes, JSON.stringify(statisticsList))
      });
  }

  public getStatisticsValuesByPlatformPeriod(platform_id: number, period_id: number) {
    return this.statisticsService.getStatisticsValuesByPlatformAndPeriod(platform_id, period_id);
  }

  public getStatisticsValuesByPeriod(period_id: number) {
    return this.statisticsService.getStatisticsByPeriod(period_id);
  }

  public getStatisticEvolutionByPlatform(platform_id: number, statistics_id: number) {
    return this.statisticsService.getStatisticsEvolutionByPlatform(platform_id, statistics_id);
  }

  updateStatisticsListInfo() {
    let statisticsList = [];
    this.getStatisticsTypes().subscribe(
      response => {
        statisticsList = response['statistics_items'];
        this.secureStorage.secureLocalStorage(constants.lSN_statisticsTypes, JSON.stringify(statisticsList))
      });
  }

  insertNewStatistic(body: NewStatistic) {
    return this.statisticsService.insertNewStatistics(body)
  }

  insertNewStatisticValue(body: NewStatisticValue) {

    return this.statisticsService.insertNewStatisticsValue(body)
  }
}
