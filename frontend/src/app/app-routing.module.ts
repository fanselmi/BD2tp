import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UrlsComponent} from "./views/pages/urls/urls.component";
import {LoginComponent} from "./views/pages/login/login.component";
import {RegisterComponent} from "./views/pages/register/register.component";

const routes: Routes = [
  {path: '', component: UrlsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
