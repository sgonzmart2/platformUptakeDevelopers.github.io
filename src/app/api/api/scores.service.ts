import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpParams,
  HttpResponse, HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_PATH } from '../variables';
import { Configuration } from '../configuration';
import { environment } from 'src/environments/environment';
import *  as constants from '../../utilities/constants';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {
  protected basePath = environment.PROD_URL_GATEWAY;
  protected basePathICSSservices = environment.PROD_URL_GATEWAY_T_SERVICES;

  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();
  reportProgress: boolean = false;

  private consumes: string[] = [
    'application/json; charset=utf-8'
  ];

  private httpHeaderAccepts: string[] = [
    'application/json; charset=utf-8'
  ];

  constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  private defaultHeader() {
    let headers = this.defaultHeaders;

    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(this.httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(this.consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }
    return headers;
  }

  public getScoreByPlatformPeriodAndDimension(platform_id, period_id, dimension_id): Observable<any> {
    let headers = this.defaultHeader();
    let path = this.basePathICSSservices + '/PlatformUptake/O2?platform_id=' + platform_id + '&period_id=' + period_id + '&global=false&dimension_id=' + dimension_id;
    return this.httpClient.get<any>(path,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        reportProgress: false
      }
    );
  }

  public getScoreByPlatformPeriodAndDimensionWithUserWeights(platform_id, period_id, dimension_id): Observable<any> {
    let headers = this.defaultHeader();
    let storageSecure = new EncryptedStorageService();
    let user_id = storageSecure.decryptSecureStorage(constants.user_id);
    let path = this.basePathICSSservices + '/PlatformUptake/O2?platform_id=' + platform_id + '&period_id=' + period_id + '&global=false&dimension_id=' + dimension_id
      + "&userweights=true&tooltype_id=1&user_id=" + user_id;
    return this.httpClient.get<any>(path,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        reportProgress: false
      }
    );
  }

  getScoreByPlatformPeriodAndCluster(platform_id, period_id, cluster_id): Observable<any> {
    let headers = this.defaultHeader();
    let path = this.basePathICSSservices + '/PlatformUptake/O2?platform_id=' + platform_id + '&period_id=' + period_id + '&global=false&cluster_id=' + cluster_id;

    return this.httpClient.get<any>(path,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        reportProgress: false
      }
    );
  }

  getScoreByPlatformPeriodAndClusterWithUserWeights(platform_id, period_id, cluster_id): Observable<any> {
    let headers = this.defaultHeader();
    let storageSecure = new EncryptedStorageService();
    let user_id = storageSecure.decryptSecureStorage(constants.user_id);
    let path = this.basePathICSSservices + '/PlatformUptake/O2?platform_id=' + platform_id + '&period_id=' + period_id + '&global=false&cluster_id=' + cluster_id
      + "&userweights=true&tooltype_id=1&user_id=" + user_id;

    return this.httpClient.get<any>(path,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        reportProgress: false
      }
    );
  }

  public getScoreEvolutionOfPlatformAndDimensionOrCluster(platform_id, typeScore: string, score_id): Observable<any> {
    let headers = this.defaultHeader();
    let storageSecure = new EncryptedStorageService();
    let user_id = storageSecure.decryptSecureStorage(constants.user_id);
    let path = this.basePathICSSservices + '/PlatformUptake/O2?platform_id=' + platform_id + '&global=false&' + typeScore + '=' + score_id + "&userweights=true&tooltype_id=1&user_id=" + user_id;
    return this.httpClient.get<any>(path,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        reportProgress: false
      }
    );
  }
}