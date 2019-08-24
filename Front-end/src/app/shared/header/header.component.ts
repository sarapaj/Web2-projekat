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

  constructor(private router:Router) { }

  ngOnInit() {
  }

  LogOutButtonClick(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

}
