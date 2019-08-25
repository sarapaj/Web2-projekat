import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() elements;
  routerLinkVariable;
  userRole;
  constructor(private router:Router) { }

  ngOnInit() {
    this.userRole = localStorage.getItem('role');
  }

  LogOutButtonClick(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }

}
