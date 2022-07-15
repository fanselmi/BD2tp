import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {UrlModel} from "../models/url.model";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.API_URL + '/api/users'

  constructor(private http: HttpClient) { }

  public register(data: UserModel): Observable<UserModel>{
    let h= new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<UserModel>(this.baseUrl, data, {headers: h});
  }

}
