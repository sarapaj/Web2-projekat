import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleAdminGuard implements CanActivate {
  
  constructor(public router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem('role') != "2"){  //nije admin
      this.router.navigate(['login']);
      return false;
    }
      return true;
    }
}

