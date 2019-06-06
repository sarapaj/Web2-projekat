import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserSidebarElements, AdminSidebarElements, KontrolerSidebarElements } from '../shared/constants';

@Component({
  selector: 'app-dash-root',
  templateUrl: './dash-root.component.html',
  styleUrls: ['./dash-root.component.css']
})
export class DashRootComponent implements OnInit {

  // 1 - korisnik, 2 - admin, 3 - kontroler
  userRole: number = 3; 
  sidebarElements = [];
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //dobaviti rolu usera
    if(this.userRole == 1){
      this.sidebarElements = UserSidebarElements;
    }
    else if(this.userRole == 2){
      this.sidebarElements = AdminSidebarElements;
    }
    else if(this.userRole == 3){
      this.sidebarElements = KontrolerSidebarElements;
    }
  }
}
