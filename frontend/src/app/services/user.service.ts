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

  public userInfo: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('Bearer Token');
    token != undefined? this.isLoggedIn.next(true) : this.isLoggedIn.next(false);

    this.isLoggedIn.subscribe(() => {
      if ( this.isLoggedIn.value )
        this.userInfo.next(null);
    })

    if ( this.isLoggedIn ) {
      this.getUser();
    }
  }

  public register(data: UserModel): Observable<UserModel>{
    let h= new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<UserModel>(this.baseUrl, data, {headers: h});
  }

  public login(data: UserModel): Observable<any>{
    let h= new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<any>(this.baseUrl + '/login', data, {headers: h});
  }

  public getToken(): string | null {
    if ( this.isLoggedIn.value )
      return localStorage.getItem('Bearer Token');
    return null;
  }

  logout(){
    this.router.navigate(["/login"]);
    localStorage.removeItem('Bearer Token');
    this.isLoggedIn.next(false);
    return;
  }

  async getUser() {
    if ( this.isLoggedIn.value ){
      let h= new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.getToken() })
      await this.http.get<UserModel>(this.baseUrl, {headers: h})
        .pipe(first())
        .subscribe((user) => {
          this.userInfo.next(user);
        });
    }
  }

  getUserInfo() {
    return this.userInfo.value;
  }

}
