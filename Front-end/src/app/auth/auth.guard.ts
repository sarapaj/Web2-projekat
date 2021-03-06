import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(public router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem('userToken') == null){
      this.router.navigate(['login']);
      return false;
    }
      return true;
    }
}

