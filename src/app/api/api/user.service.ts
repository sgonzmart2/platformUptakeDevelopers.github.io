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
export class UserService {

    protected basePath = environment.PROD_URL_GATEWAY;
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
      *  
      * @param body Data of the user to perform authentication.
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
    public insertNewUserWeights(body: ModelObject, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public insertNewUserWeights(body: ModelObject, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public insertNewUserWeights(body: ModelObject, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public insertNewUserWeights(body: ModelObject, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling getDailyObjetives.');
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

        let path = this.basePath + '/api/O6';

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