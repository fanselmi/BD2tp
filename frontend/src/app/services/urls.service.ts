import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {UrlModel} from "../models/url.model";


@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  private baseUrl = environment.API_URL + '/api/urls'

  constructor(private http: HttpClient) { }

  public createUrl(data: UrlModel): Observable<any>{
    let h= new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(this.baseUrl, data, {headers: h});
  }

  public getOriginalUrl(id: string): Observable<any>{
    const opts : any = {
      responseType: 'text'
    };
    return this.http.get<any>(this.baseUrl + '/' + id, opts);
  }
}
