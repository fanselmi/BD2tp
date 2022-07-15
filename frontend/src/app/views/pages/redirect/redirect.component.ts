import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UrlModel} from "../../../models/url.model";

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  private original!: string;
  public loading = true;

  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.original = response.original;
      window.location.href =this.original;
    });
  }

}
