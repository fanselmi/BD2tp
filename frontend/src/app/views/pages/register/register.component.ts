import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {UserModel} from "../../../models/user.model";
import {finalize} from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;
  public loading: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      username: new FormControl('', [Validators.maxLength(150), Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  public onSubmit(): void {
    this.loading = true;
    this.userService.register(new UserModel(this.registerForm.value.username, this.registerForm.value.email, this.registerForm.value.password))
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (user: UserModel) => {
          console.log(user);
          this.router.navigate(['/login']);
        },
        error: (err: Error) => {
          console.log(err);
        }
      })
  }

}
