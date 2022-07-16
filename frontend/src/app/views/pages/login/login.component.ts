import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { UserService } from "../../../services/user.service";
import { UserModel } from "../../../models/user.model";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, EMPTY, first } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public loading: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      username: new FormControl('', [Validators.maxLength(150), Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  get email(){
    return this.loginForm.get('email')
  }

  get username(){
    return this.loginForm.get('username')
  }

  get password(){
    return this.loginForm.get('password')
  }

  async onSubmit(): Promise<void> {
    this.loading = true;
    this.userService.login(new UserModel(this.username?.value, this.email?.value, this.password?.value))
      .pipe(
        first(),
        catchError(err => {
          this.loading = false;
          //this.router.navigate(["/login"]);
          return EMPTY
        }))
      .subscribe( tokenString => {
        localStorage.setItem('Bearer Token', tokenString.access_token);
        this.userService.isLoggedIn.next(true);
        this.router.navigate(["/"]);
      })
  }

}
