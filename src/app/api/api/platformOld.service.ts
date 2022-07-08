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


@Injectable({
    providedIn: 'root',
})

export class PlatformOldService {
    protected basePath = environment.PROD_URL_GATEWAY;
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    responsePlatformData = {}

    responsePlatformDataManagement = {}

    responseActivageDimesionScores = {}

    responseEkoSmartDimesionScores = {}

    responseFIWAREDimesionScores = {}

    response1KPIs = {}

    response2KPIs = {}

    response3KPIs = {}

    response4KPIs = {}

    response5KPIs = {}

    response6KPIs =
        {}

    response7KPIs =
        {}

    response8KPIs =
        {}

    responseEvolutionKPI =
        {}

    responseEvolutionTechinicalDim =
        {}

    responseEvolutionStatisticPages =
        {}

    responseEvolutionStatisticUnique =
        {}
    responseStatisticActivage =
        {}

    responseStatisticEkoSmart =
        {}


    responseFeedback =
        {}


    responsePlatformsDMKPIsValues =
        {}

    responsePeriods =
        {}

    responsePeriodsDataManagement =
        {}

    responseStatisticsManagement =
        {}


    responseRatings =
        {}

    responseDevelopersComents = {}


    responseKPIList = {}
    constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }


    public getPlaftformImage(body: ModelObject, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getPlaftformImage(body: ModelObject, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getPlaftformImage(body: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getPlaftformImage(body?: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<any>;
    public getPlaftformImage(body: ModelObject, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

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

        let path = '/api/O0?platform_id=' + body;
        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    public getPlatformDimensionScore(body: ModelObject, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getPlatformDimensionScore(body: ModelObject, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getPlatformDimensionScore(body: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getPlatformDimensionScore(body?: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<any>;
    public getPlatformDimensionScore(body: ModelObject, observe: any = 'body', reportProgress: boolean = false): Observable<any> {


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

        //let path = this.basePath + '/login';
        /*return this.httpClient.post<any>(path, body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );*/
        var obs;
        if (body == "activage") {
            obs = new Observable(observer => {
                observer.next(this.responseActivageDimesionScores);
            });
        }
        else if (body == "ekoSmart") {
            obs = new Observable(observer => {
                observer.next(this.responseEkoSmartDimesionScores);
            });
        }
        else {
            obs = new Observable(observer => {
                observer.next(this.responseActivageDimesionScores);
            });
        }
        return obs;
    }

    public getPlatformUserScore(body: ModelObject, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getPlatformUserScore(body: ModelObject, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getPlatformUserScore(body: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getPlatformUserScore(body?: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<any>;
    public getPlatformUserScore(body: ModelObject, observe: any = 'body', reportProgress: boolean = false): Observable<any> {


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

        //let path = this.basePath + '/login';
        /*return this.httpClient.post<any>(path, body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );*/
        var obs;
        if (body == "activage") {
            obs = new Observable(observer => {
                observer.next(this.responseActivageDimesionScores);
            });
        }
        else if (body == "ekoSmart") {
            obs = new Observable(observer => {
                observer.next(this.responseEkoSmartDimesionScores);
            });
        }
        else {
            obs = new Observable(observer => {
                observer.next(this.responseActivageDimesionScores);
            });
        }
        return obs;
    }

    public getPlatformKpis(body: ModelObject, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getPlatformKpis(body: ModelObject, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getPlatformKpis(body: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getPlatformKpis(body?: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<any>;
    public getPlatformKpis(body: ModelObject, observe: any = 'body', reportProgress: boolean = false): Observable<any> {


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

        //let path = this.basePath + '/login';
        /*return this.httpClient.post<any>(path, body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );*/
        var obs;
        switch (body) {
            case 1:
                obs = new Observable(observer => { observer.next(this.response1KPIs); });
                break;
            case 2:
                obs = new Observable(observer => { observer.next(this.response2KPIs); });
                break;
            case 3:
                obs = new Observable(observer => { observer.next(this.response3KPIs); });
                break;
            case 4:
                obs = new Observable(observer => { observer.next(this.response4KPIs); });
                break;
            case 5:
                obs = new Observable(observer => { observer.next(this.response5KPIs); });
                break;
            case 6:
                obs = new Observable(observer => { observer.next(this.response6KPIs); });
                break;
            case 7:
                obs = new Observable(observer => { observer.next(this.response7KPIs); });
                break;
            case 8:
                obs = new Observable(observer => { observer.next(this.response8KPIs); });
                break;
            default:
                obs = new Observable(observer => { observer.next(this.response8KPIs); });
                break;

        }
        /*if (body == "1") {
            
        }
        else if (body == "2") {
            obs = new Observable(observer => {
                observer.next(this.responseKPIs);
            });
        }
        else {
            obs = new Observable(observer => {
                observer.next(this.response2KPIs);
            });
        }*/
        return obs;
    }

    public getAllTypePeriodsList(body: ModelObject, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getAllTypePeriodsList(body: ModelObject, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getAllTypePeriodsList(body: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getAllTypePeriodsList(body?: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<any>;
    public getAllTypePeriodsList(body: ModelObject, observe: any = 'body', reportProgress: boolean = false): Observable<any> {


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

        //let path = this.basePath + '/login';
        /*return this.httpClient.post<any>(path, body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );*/
        const obs = new Observable(observer => {
            observer.next(this.responsePeriodsDataManagement);
        });

        return obs;
    }
}
