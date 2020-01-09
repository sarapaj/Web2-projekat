import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserSidebarElements, AdminSidebarElements, KontrolerSidebarElements, NotLogedUserHeaderElements, LogedUserHeaderElements, NotLoggedUserSidebarElements } from '../shared/constants';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dash-root',
  templateUrl: './dash-root.component.html',
  styleUrls: ['./dash-root.component.css']
})
export class DashRootComponent implements OnInit {

  public userRole = "3";
 
  sidebarElements = [];
  headerElements = [];
  username:string;
  
  constructor(private route: ActivatedRoute, private _userService: UserService) {
  }

  ngOnInit() {
    this.userRole = localStorage.getItem('role');
    this.determineUserRole();
  }

  private determineUserRole() {
    if(this.userRole == "0"){
      this.sidebarElements = UserSidebarElements;
      this.headerElements = LogedUserHeaderElements;
    }
    else if(this.userRole == "1"){
      this.sidebarElements = AdminSidebarElements;
      this.headerElements = LogedUserHeaderElements;
    }
    else if(this.userRole == "2"){
      this.sidebarElements = KontrolerSidebarElements;
      this.headerElements = LogedUserHeaderElements;
    }
    else{
      this.sidebarElements = NotLoggedUserSidebarElements; // neregistrovani korisnik
      this.headerElements = NotLogedUserHeaderElements;
      localStorage.setItem('role','3');
    }
  }
}
