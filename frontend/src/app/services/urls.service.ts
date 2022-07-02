import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  private baseUrl = environment.API_URL + '/api/urls'

  constructor(private http: HttpClient) { }

  public createUrl(longUrl: string): Observable<any>{
    let body = "{" +
      "\"original\" : \"" + longUrl + "\"," +
      "\"user_id\": 1" +
      "}";
    let h= new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(this.baseUrl, body, {headers: h});
  }
}
