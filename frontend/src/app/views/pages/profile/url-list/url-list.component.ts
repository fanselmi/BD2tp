import { Component, OnInit } from '@angular/core';
import { first, Observable } from "rxjs";
import { UrlModel } from "../../../../models/url.model";
import { UrlsService } from "../../../../services/urls.service";

@Component({
  selector: 'app-url-list',
  templateUrl: './url-list.component.html',
  styleUrls: ['./url-list.component.scss']
})
export class UrlListComponent implements OnInit {

  urls$!: Observable<UrlModel[]>;

  constructor(private urlsService: UrlsService) { }

  ngOnInit(): void {
    this.getUrls();
  }

  onUrlDelete(){
    this.getUrls();
  }

  getUrls() {
    this.urls$ = this.urlsService.getUrls().pipe(first());
  }

}
