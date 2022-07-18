import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { UrlsService } from "../../../services/urls.service";
import { first, Observable } from "rxjs";
import { UrlModel } from "../../../models/url.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../urls/urls.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor( private userService: UserService) { }

  ngOnInit(): void {
  }

}
