import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { BehaviorSubject, catchError, EMPTY, first, Observable } from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserModel} from "../models/user.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.API_URL + '/api/users'

  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('Bearer Token');
    token != undefined? this.isLoggedIn.next(true) : this.isLoggedIn.next(false);
  }

  public register(data: UserModel): Observable<UserModel>{
    let h= new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<UserModel>(this.baseUrl, data, {headers: h});
  }

  public login(data: UserModel): Observable<any>{
    let h= new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<any>(this.baseUrl + '/login', data, {headers: h});
  }

  logout(){
    this.router.navigate(["/login"]);
    localStorage.removeItem('Bearer Token');
    this.isLoggedIn.next(false);
    return;
  }

}
