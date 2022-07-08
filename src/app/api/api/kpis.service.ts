import { Inject, Injectable, Optional } from '@angular/core';
import {
    HttpClient, HttpHeaders, HttpParams,
    HttpResponse, HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_PATH } from '../variables';
import { Configuration } from '../configuration';
import { environment } from 'src/environments/environment';
import { ModelObject } from 'src/app/models/model-object';

@Injectable({
    providedIn: 'root'
})
export class KPIsService {
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

    public getKpisCategories(): Observable<any> {
        let headers = this.defaultHeader();
        let path = this.basePath + '/api/O17';
        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                reportProgress: false
            }
        );
    }

    public getKpisClusters(): Observable<any> {
        let headers = this.defaultHeader();
        let path = this.basePath + '/api/O19';
        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                reportProgress: false
            }
        );
    }

    public getKpisDimensions(): Observable<any> {
        let headers = this.defaultHeader();
        let path = this.basePath + '/api/O18';
        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                reportProgress: false
            }
        );
    }

    public getKpisInfoList(): Observable<any> {
        let headers = this.defaultHeader();
        let path = this.basePath + '/api/O4';
        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                reportProgress: false
            }
        );
    }

    public getKpisValuesByPlatformPeriodAndDimension(pltfrm_id: number, period_id: number, dim_id: number): Observable<any> {
        let headers = this.defaultHeader();
        let path = this.basePath + '/api/O5?platform_id=' + pltfrm_id + '&period_id=' + period_id + '&dimension_id=' + dim_id;

        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                reportProgress: false
            }
        );
    }

    public getKpisValuesByPlatformPeriodAndCluster(pltfrm_id: number, period_id: number, dim_id: number): Observable<any> {
        let headers = this.defaultHeader();
        let path = this.basePath + '/api/O5?platform_id=' + pltfrm_id + '&period_id=' + period_id + '&cluster_id=' + dim_id;
        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                reportProgress: false
            }
        );
    }

    public getEvolutionKPIByPlatform(pltfrm_id: number, kpi_id: number): Observable<any> {
        let headers = this.defaultHeader();
        let path = this.basePath + '/api/O5?kpi_id=' + kpi_id + '&platform_id=' + pltfrm_id;

        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                reportProgress: false
            }
        );
    }

    public getKPIsValuesByPeriodAndDimnsionID(period_id: number, dimension_id: number): Observable<any> {
        let headers = this.defaultHeader();
        let path = this.basePath + '/api/O5?period_id=' + period_id + '&dimension_id=' + dimension_id;

        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                reportProgress: false
            }
        );
    }

    public getKPIsValuesByPeriodAndClusterID(period_id: number, cluster_id: number): Observable<any> {
        let headers = this.defaultHeader();
        let path = this.basePath + '/api/O5?period_id=' + period_id + '&cluster_id=' + cluster_id;

        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                reportProgress: false
            }
        );
    }

    public getKPIsValuesByPeriod(period_id: Number): Observable<any> {
        let headers = this.defaultHeader();
        let path = this.basePath + '/api/O5?period_id=' + period_id;

        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                reportProgress: false
            }
        );
    }

    public insertNewKPIValue(body: ModelObject, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public insertNewKPIValue(body: ModelObject, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public insertNewKPIValue(body: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public insertNewKPIValue(body: ModelObject, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling auth.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json; charset=utf-8'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json; charset=utf-8'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let path = this.basePathICSSservices + '/PlatformUptake/O21';
        return this.httpClient.post<any>(path, body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }


    public insertNewKPI(body: ModelObject, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public insertNewKPI(body: ModelObject, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public insertNewKPI(body: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public insertNewKPI(body: ModelObject, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling auth.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json; charset=utf-8'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json; charset=utf-8'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let path = this.basePathICSSservices + '/PlatformUptake/O20';
        return this.httpClient.post<any>(path, body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }
}