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
import { UrlsComponent } from './views/pages/urls/urls.component';

@NgModule({
  declarations: [
    AppComponent,
    TopmenuComponent,
    LoginComponent,
    RegisterComponent,
    UrlsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      MatInputModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
