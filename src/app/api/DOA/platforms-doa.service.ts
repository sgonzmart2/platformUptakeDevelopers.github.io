import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlatformOldService } from '../api/platformOld.service';
import *  as constants from '../../utilities/constants';
import { FunctionsComponent } from 'src/app/utilities/functions';
import { PlatformService } from '../api/platform.service';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';

@Injectable({
  providedIn: 'root'
})
export class PlatformsDOAService {

  platformService: PlatformService;
  constructor(private http: HttpClient,
    private secureStorage: EncryptedStorageService) {
    this.platformService = new PlatformService(this.http, null, null);
  }

  getPlatformsData() {
    return this.platformService.getPlaftformsData();
  }

  async getInitialPlatformsData() {
    return await this.platformService.getInitialPlaftformsData();
  }

  updatePlatformsInfo() {

    let listPlatforms = [];
    let numPlat = 0;
    this.getPlatformsData().subscribe(
      response => {
        let list = response['platforms']
        list.forEach(element => {
          if (!element.flagged) {
            listPlatforms.push(element);
            numPlat++;
          }
        });
        this.secureStorage.secureLocalStorage(constants.lSN_platformsList, JSON.stringify(listPlatforms))
        this.secureStorage.secureLocalStorage(constants.lSN_numberPlatform, listPlatforms.length.toString())
      });
  }

  public getPlatformWithCQ() {
    let service: PlatformService = new PlatformService(this.http, null, null);
    let forcedHeaders = service.defaultHeaders;
    const httpHeaderAuthorizationSelected: string | undefined = "";
    // Authorization header
    forcedHeaders = forcedHeaders.set('Authorization', httpHeaderAuthorizationSelected);
    // Re-assign of the new 'defaultHeaders'
    service.defaultHeaders = forcedHeaders;
    return service.getPlaftformsWitCQ();
  }

  public getPlatformWithCQByID(platform_id) {
    let service: PlatformService = new PlatformService(this.http, null, null);
    let forcedHeaders = service.defaultHeaders;
    const httpHeaderAuthorizationSelected: string | undefined = "";
    // Authorization header
    forcedHeaders = forcedHeaders.set('Authorization', httpHeaderAuthorizationSelected);
    // Re-assign of the new 'defaultHeaders'
    service.defaultHeaders = forcedHeaders;
    return service.getPlaftformsWitCQByPlatformId(platform_id);
  }

  public getPlatformsGlobalScoreByPeriod(period_id) {

    let service: PlatformService = new PlatformService(this.http, null, null);
    let forcedHeaders = service.defaultHeaders;
    const httpHeaderAuthorizationSelected: string | undefined = "";
    // Authorization header
    forcedHeaders = forcedHeaders.set('Authorization', httpHeaderAuthorizationSelected);
    // Re-assign of the new 'defaultHeaders'
    service.defaultHeaders = forcedHeaders;
    return service.getGlobalScoreByPeriodId(period_id);
  }

  public getGlobalScoreByPlatformAndPeriodId(platform_id, period_id) {

    let service: PlatformService = new PlatformService(this.http, null, null);
    let forcedHeaders = service.defaultHeaders;
    const httpHeaderAuthorizationSelected: string | undefined = "";
    // Authorization header
    forcedHeaders = forcedHeaders.set('Authorization', httpHeaderAuthorizationSelected);
    // Re-assign of the new 'defaultHeaders'
    service.defaultHeaders = forcedHeaders;
    return service.getGlobalScoreByPlatformAndPeriodId(platform_id, period_id);
  }

  public getGlobalScoreByPeriodIdAndTypeOfScore(period_id, type_score, type_score_id) {
    let service: PlatformService = new PlatformService(this.http, null, null);
    let forcedHeaders = service.defaultHeaders;
    const httpHeaderAuthorizationSelected: string | undefined = "";
    // Authorization header
    forcedHeaders = forcedHeaders.set('Authorization', httpHeaderAuthorizationSelected);
    // Re-assign of the new 'defaultHeaders'
    service.defaultHeaders = forcedHeaders;
    return service.getGlobalScoreByPeriodIdAndTypeOfScore(period_id, type_score, type_score_id);
  }

  insertNewPlatform(body) {
    return this.platformService.insertNewPlatform(body);
  }

  updatePlatformInfo(body) {
    return this.platformService.updatePlatformInfo(body);
  }

  uploadNewPlatformImage(body) {
    return this.platformService.uploadImage(body);
  }
}
