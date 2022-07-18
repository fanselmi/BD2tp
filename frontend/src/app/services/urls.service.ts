import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "../../environments/environment";
import { EMPTY, Observable } from "rxjs";
import {UrlModel} from "../models/url.model";
import { UserService } from "./user.service";


@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  private baseUrl = environment.API_URL + '/api/urls'

  constructor(private http: HttpClient, private userService: UserService) { }

  public createUrl(data: UrlModel): Observable<any>{
    if ( this.userService.isLoggedIn.value ){
      let h= new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.userService.getToken() })
      return this.http.post(this.baseUrl + '/' + this.userService.getUserInfo()?.userId, data, {headers: h});
    }
    else {
      let h= new HttpHeaders({ 'Content-Type': 'application/json'})
      return this.http.post(this.baseUrl, data, {headers: h});
    }

  }

  public editUrl(data: UrlModel): Observable<any>{
    let h= new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.userService.getToken() })
    return this.http.put(this.baseUrl + '/' + data.id, data, {headers: h});
  }

  public deleteUrl(data: UrlModel): Observable<any>{
    let h= new HttpHeaders({ 'Authorization': 'Bearer ' + this.userService.getToken() })
    return this.http.delete(this.baseUrl + '/' + data.id, {headers: h});
  }

  public getOriginalUrl(id: string): Observable<any>{
    const opts : any = {
      responseType: 'text'
    };
    return this.http.get<any>(this.baseUrl + '/' + id, opts);
  }

  public getUrls(): Observable<UrlModel[]> {
    if ( this.userService.isLoggedIn.value ){
      let h= new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.userService.getToken() })
      return this.http.get<UrlModel[]>(this.baseUrl, { headers: h })
    }
    return EMPTY;
  }
}
