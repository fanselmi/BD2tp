import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UrlModel} from "../../../models/url.model";

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  private urlModel!: UrlModel;
  public loading = true;

  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.urlModel = response.urlModel;
      window.location.href =this.urlModel.original;
    });
  }

}
