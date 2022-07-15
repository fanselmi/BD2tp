import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UrlsComponent} from "./views/pages/urls/urls.component";
import {LoginComponent} from "./views/pages/login/login.component";
import {RegisterComponent} from "./views/pages/register/register.component";
import {RedirectComponent} from "./views/pages/redirect/redirect.component";
import {UrlResolverService} from "./services/url-resolver.service";
import {Error404Component} from "./views/pages/error404/error404.component";

const routes: Routes = [
  {path: '', component: UrlsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '404', component: Error404Component},
  {path: ':id', component: RedirectComponent, resolve:{ original: UrlResolverService}},
  { path: '**', redirectTo: '/', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
