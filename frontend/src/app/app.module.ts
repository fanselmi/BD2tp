import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopmenuComponent } from './views/layout/topmenu/topmenu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import {UrlsModule} from "./views/pages/urls/urls.module";
import { HttpClientModule } from '@angular/common/http';
import {NgxLoadingButtonsModule} from "ngx-loading-buttons";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import { RedirectComponent } from './views/pages/redirect/redirect.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { Error404Component } from './views/pages/error404/error404.component';


@NgModule({
  declarations: [
    AppComponent,
    TopmenuComponent,
    RegisterComponent,
    LoginComponent,
    RedirectComponent,
    Error404Component

  ],
  imports: [
    UrlsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    NgxLoadingButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
