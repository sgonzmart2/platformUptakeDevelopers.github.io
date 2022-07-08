import { Injectable } from '@angular/core';
import *  as constants from '../../utilities/constants';
import { KPIsService } from '../api/kpis.service';
import { HttpClient } from '@angular/common/http';
import { NewKPIValue, KPIs } from 'src/app/models/kpis';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';

@Injectable({
  providedIn: 'root'
})
export class KpiDoaService {
  kpis_service: KPIsService;

  constructor(private http: HttpClient,
    private secureStorage: EncryptedStorageService) {

    this.kpis_service = new KPIsService(this.http, null, null);
    let forcedHeaders = this.kpis_service.defaultHeaders;
    const httpHeaderAuthorizationSelected: string | undefined = "";
    forcedHeaders = forcedHeaders.set('Authorization', httpHeaderAuthorizationSelected);
    this.kpis_service.defaultHeaders = forcedHeaders;
  }

  private getListOfKPICategories() {
    return this.kpis_service.getKpisCategories()
  }

  private getListOfKPIClusters() {
    return this.kpis_service.getKpisClusters()
  }

  private getListOfKPIDimensions() {
    return this.kpis_service.getKpisDimensions()
  }

  public getAllKPIsList() {
    return this.kpis_service.getKpisInfoList();
  }

  public getKPIsValuesByPlatformPeriodDimension(platform_id: number, period_id: number, dimension_id: number) {
    return this.kpis_service.getKpisValuesByPlatformPeriodAndDimension(platform_id, period_id, dimension_id);
  }

  public getKPIsValuesByPlatformPeriodCluster(platform_id: number, period_id: number, cluster_id: number) {
    return this.kpis_service.getKpisValuesByPlatformPeriodAndCluster(platform_id, period_id, cluster_id);
  }

  public getKPIEvolutionByPlatId(platform_id, kpi_id) {
    return this.kpis_service.getEvolutionKPIByPlatform(platform_id, kpi_id);
  }

  public getKPIsDimensionValuesByPeriod(period_id, dimension_id) {
    return this.kpis_service.getKPIsValuesByPeriodAndDimnsionID(period_id, dimension_id);
  }

  public getKPIsClusterValuesByPeriod(period_id, cluster_id) {
    return this.kpis_service.getKPIsValuesByPeriodAndClusterID(period_id, cluster_id);
  }

  updateKPIsCategories() {
    let listCategories = [];
    this.getListOfKPICategories().subscribe(
      response => {
        let list = response['KPI_categories'];
        list.forEach(element => {
          if (element.category_abbreviation != null) {
            listCategories.push(element);
          }
        });
        this.secureStorage.secureLocalStorage(constants.lSN_category, JSON.stringify(listCategories))
      });
  }

  updateKPIsClusters() {
    let listClusters = [];
    this.getListOfKPIClusters().subscribe(
      response => {
        let list = response['clusters'];
        list.forEach(element => {
          listClusters.push(element)
        });
        this.secureStorage.secureLocalStorage(constants.lSN_cluster, JSON.stringify(listClusters))
      });
  }

  updateKPIsDimension() {
    let listDimension = [];
    this.getListOfKPIDimensions().subscribe(
      response => {
        let list = response['dimensions']
        list.forEach(element => {
          listDimension.push(element)
        });
        this.secureStorage.secureLocalStorage(constants.lSN_dimension, JSON.stringify(listDimension))
      });
  }

  updateKPIsListInfo() {
    let KPIs_list;
    this.getAllKPIsList().subscribe(
      response => {
        KPIs_list = response['KPI_characteristics'];
        KPIs_list.forEach(kpi => {
          let kpiToSave = {} as KPIs
          kpiToSave = kpi;
          if (kpi['larger_is_better']) {
            kpiToSave.zero_right = kpi["1left"];
            kpiToSave.one_left = kpi["1left"];
            kpiToSave.one_right = kpi["2left"];
            kpiToSave.two_left = kpi["2left"];
            kpiToSave.two_right = kpi["3left"];
            kpiToSave.three_left = kpi["3left"];
            kpiToSave.three_right = kpi["4left"];
            kpiToSave.four_left = kpi["4left"];
          }
          else {
            kpiToSave.zero_right = kpi["0right"];
            kpiToSave.one_left = kpi["0right"];
            kpiToSave.two_left = kpi["1right"];
            kpiToSave.three_left = kpi["2right"];
            kpiToSave.four_left = kpi["3right"];

            kpiToSave.one_right = kpi["1right"];
            kpiToSave.two_right = kpi["2right"];
            kpiToSave.three_right = kpi["3right"];
          }
        })
        this.secureStorage.secureLocalStorage(constants.lSN_KPIs_list, JSON.stringify(KPIs_list))
        return true;
      })
  }

  getKPIsValuesByPeriodId(period_id) {
    return this.kpis_service.getKPIsValuesByPeriod(period_id);
  }

  insertNewKPIValue(body: NewKPIValue) {
    return this.kpis_service.insertNewKPIValue(body)
  }

  insertNewKPI(body) {
    return this.kpis_service.insertNewKPI(body);
  }
}
