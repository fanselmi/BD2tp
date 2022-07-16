import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { BehaviorSubject, catchError, EMPTY, first, Observable } from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserModel} from "../models/user.model";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.API_URL + '/api/users'

  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  public register(data: UserModel): Observable<UserModel>{
    let h= new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<UserModel>(this.baseUrl, data, {headers: h});
  }

  public login(data: UserModel){
    let h= new HttpHeaders({ 'Content-Type': 'application/json' })
    const token = this.http.post<string>(this.baseUrl + '/login', data, {headers: h});
    token.pipe(
      catchError(error => {
        return error;
      }),
      first()
      ).subscribe( tokenString => {
        console.log(tokenString)
      sessionStorage.setItem('Bearer Token', tokenString as string);
      this.isLoggedIn.next(true);
      this.router.navigate(["/"]);
    })
  }

}
