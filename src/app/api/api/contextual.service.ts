import { Inject, Injectable, Optional } from '@angular/core';
import {
    HttpClient, HttpEvent, HttpHeaders, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_PATH } from '../variables';
import { Configuration } from '../configuration';
import { environment } from 'src/environments/environment';
import { ModelObject } from 'src/app/models/model-object';

@Injectable({
    providedIn: 'root'
})
export class ContextualService {
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

    public getContextualQuestions(observe: any = 'body', reportProgress: boolean = false): Observable<any> {
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

        let path = this.basePath + '/api/O14';
        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    public getDeveloperQuestionTypes(): Observable<any> {
        let headers = this.defaultHeader();
        let path = this.basePathICSSservices + '/PU/T7';
        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                reportProgress: false
            }
        );
    }

    public getDevQAndRatingsByPlatformId(platform_id): Observable<any> {
        let headers = this.defaultHeader();
        let path = this.basePath + '/api/O10?platform_id=' + platform_id;

        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                reportProgress: false
            }
        );
    }

    public getDevelopersComments(platform_id, developerquestion_id): Observable<any> {
        let headers = this.defaultHeader();
        let path = this.basePathICSSservices + '/PU/O11plus?platform_id=' + platform_id + "&developerquestion_id=" + developerquestion_id;
        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                reportProgress: false
            }
        );
    }

    public getDevFeedbacksByPlatformId(platform_id): Observable<any> {
        let headers = this.defaultHeader();
        let path = this.basePath + '/api/O12?platform_id=' + platform_id;

        return this.httpClient.get<any>(path,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                reportProgress: false
            }
        );
    }

    public insertNewContextualQuestions(body: ModelObject, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public insertNewContextualQuestions(body: ModelObject, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public insertNewContextualQuestions(body: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public insertNewContextualQuestions(body: ModelObject, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

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

        let path = this.basePathICSSservices + '/PU/O28';
        return this.httpClient.post<any>(path, body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }


    public updateContextualQuestions(body: ModelObject, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateContextualQuestions(body: ModelObject, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateContextualQuestions(body: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateContextualQuestions(body: ModelObject, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling auth.');
        }
        //console.log(body);

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

        let path = this.basePathICSSservices + '/PU/O27';
        return this.httpClient.post<any>(path, body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    public updateOrderCQuestions(body: ModelObject, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateOrderCQuestions(body: ModelObject, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateOrderCQuestions(body: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateOrderCQuestions(body: ModelObject, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

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

        let path = this.basePathICSSservices + '/PlatformUptake/O30';
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