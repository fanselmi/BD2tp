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
import { ProfileComponent } from './views/pages/profile/profile.component';
import { UrlListComponent } from './views/pages/profile/url-list/url-list.component';
import { UrlCardComponent } from './views/pages/profile/url-card/url-card.component';
import { MatExpansionModule } from "@angular/material/expansion";
import { ConfirmationModalComponent } from './views/pages/profile/confirmation-modal/confirmation-modal.component';
import { EditModalComponent } from './views/pages/profile/edit-modal/edit-modal.component';
import { MatDialogModule } from "@angular/material/dialog";


@NgModule({
  declarations: [
    AppComponent,
    TopmenuComponent,
    RegisterComponent,
    LoginComponent,
    RedirectComponent,
    Error404Component,
    ProfileComponent,
    UrlListComponent,
    UrlCardComponent,
    ConfirmationModalComponent,
    EditModalComponent

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
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
