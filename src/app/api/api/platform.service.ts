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
import * as constants from '../../utilities/constants';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';


@Injectable({
    providedIn: 'root',
})

export class PlatformService {
    protected basePath = environment.PROD_URL_GATEWAY;
    protected basePathICSSservices = environment.PROD_URL_GATEWAY_T_SERVICES;

    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

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

    public async getInitialPlaftformsData() {
        let listPlatforms = [];
        let numPlat = 0;

        let headers = this.defaultHeader();
        let path = this.basePathICSSservices + '/PlatformUptake/O1';

        this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                reportProgress: false
            }
        ).subscribe(
            response => {
                let storageSecure = new EncryptedStorageService();
                let list = response['platforms']
                list.forEach(element => {
                    if (!element.flagged) {
                        listPlatforms.push(element);
                        numPlat++;
                    }
                });
                storageSecure.secureLocalStorage(constants.lSN_platformsList, JSON.stringify(listPlatforms))
                storageSecure.secureLocalStorage(constants.lSN_numberPlatform, listPlatforms.length.toString())
            });
    }

    public getPlaftformsData(): Observable<any> {
        let headers = this.defaultHeader();
        let path = this.basePathICSSservices + '/PlatformUptake/O1';

        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                reportProgress: false
            }
        );
    }



    public getPlaftformsWitCQ(body: ModelObject, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getPlaftformsWitCQ(body: ModelObject, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getPlaftformsWitCQ(body: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getPlaftformsWitCQ(body?: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<any>;
    public getPlaftformsWitCQ(body: ModelObject, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

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

        let path = this.basePath + '/api/O13';
        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    public getPlaftformsWitCQByPlatformId(platform_id): Observable<any> {
        let headers = this.defaultHeader();
        let path = this.basePath + '/api/O13?platform_id=' + platform_id;

        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                reportProgress: false
            }
        );
    }


    public getPlatformFeedback(body: ModelObject, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getPlatformFeedback(body: ModelObject, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getPlatformFeedback(body: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getPlatformFeedback(body?: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<any>;
    public getPlatformFeedback(body: ModelObject, observe: any = 'body', reportProgress: boolean = false): Observable<any> {


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

        let path = this.basePath + '/api/O13';
        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }


    public getGlobalScoreByPeriodId(period_id): Observable<any> {
        let headers = this.defaultHeader();
        let path = this.basePathICSSservices + '/PlatformUptake/O9?period_id=' + period_id;

        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                reportProgress: false
            }
        );
    }

    public getGlobalScoreByPlatformAndPeriodId(platform_id, period_id): Observable<any> {
        let headers = this.defaultHeader();
        let path = this.basePathICSSservices + '/PlatformUptake/O9?platform_id=' + platform_id + '&period_id=' + period_id;

        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                reportProgress: false
            }
        );
    }

    public getGlobalScoreByPeriodIdAndTypeOfScore(period_id, type_score, type_score_id): Observable<any> {
        let headers = this.defaultHeader();
        let path;
        if (type_score == constants.type_KPI.cluster) {
            path = this.basePathICSSservices + '/PlatformUptake/O9?period_id=' + period_id + "&global=false&cluster_id=" + type_score_id;
        }
        else if (type_score == constants.type_KPI.dimension) {
            path = this.basePathICSSservices + '/PlatformUptake/O9?period_id=' + period_id + "&global=false&dimension_id=" + type_score_id;
        }

        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                reportProgress: false
            }
        );
    }

    public testCorsIcss(body: ModelObject, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public testCorsIcss(body: ModelObject, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public testCorsIcss(body: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public testCorsIcss(body?: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<any>;
    public testCorsIcss(body: ModelObject, observe: any = 'body', reportProgress: boolean = false): Observable<any> {


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

        let path = 'https://ponte.grid.ece.ntua.gr:8443/PU/T2';
        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    public insertNewPlatform(body: ModelObject, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public insertNewPlatform(body: ModelObject, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public insertNewPlatform(body: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public insertNewPlatform(body?: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<any>;
    public insertNewPlatform(body: ModelObject, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
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

        let path = this.basePath + '/api/O16';
        return this.httpClient.post<any>(path, body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    public updatePlatformInfo(body: ModelObject, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updatePlatformInfo(body: ModelObject, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updatePlatformInfo(body: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updatePlatformInfo(body?: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<any>;
    public updatePlatformInfo(body: ModelObject, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
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

        let path = this.basePath + '/api/O15';
        return this.httpClient.put<any>(path, body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    public uploadImage(body: ModelObject, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public uploadImage(body: ModelObject, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public uploadImage(body: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public uploadImage(body?: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<any>;
    public uploadImage(body: ModelObject, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
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
            'multipart/form-data'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        /*if (httpContentTypeSelected != undefined) {

            headers = headers.set('Content-Type', 'multipart/form-data');
        }*/

        let path = this.basePath + '/api/O0';

        return this.httpClient.post<any>(path, body,
            {

                headers
            }
        );
    }
}
