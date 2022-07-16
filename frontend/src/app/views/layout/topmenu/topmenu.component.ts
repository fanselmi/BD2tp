import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss']
})
export class TopmenuComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }


  userLogout(){
    this.userService.logout()
  }


}
