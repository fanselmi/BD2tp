import {NgModule} from "@angular/core";
import {UrlsComponent} from "./urls.component";
import {CreateUrlComponent} from "./create-url/create-url.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgxLoadingButtonsModule} from "ngx-loading-buttons";
import {MatDatepickerModule} from "@angular/material/datepicker";

@NgModule({
  declarations: [
    UrlsComponent,
    CreateUrlComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        NgxLoadingButtonsModule,
        MatDatepickerModule

    ],
  providers: [],
  bootstrap: [UrlsComponent]
})
export class UrlsModule { }
