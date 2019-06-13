import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/models/korisnik';
import { UserClaims } from 'src/models/user-claims';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private _baseUrl = environment.baseUrl;
  userRole;
  userClaims: UserClaims = new UserClaims();
  
  constructor(private _http: HttpClient) {
    this.setUserRole();
  }

  setUserRole() {
    this.getUserClaims().subscribe(claim => {
      this._http.get(this._baseUrl + '/api/Ticket/GetUserRole?Email=' + (claim as any).Email).subscribe(role => {
        this.userRole = role;
      })
    });
  }

  getUserRole() {
    return this.userRole;
  }

  registerUser(user:User)
  {
    const body: User = {
      Email: user.Email,
      Password: user.Password,
      ConfirmPassword: user.ConfirmPassword,      
    }

    return this._http.post(this._baseUrl + '/api/Account/Register', body);
  }  

  userAuthentication(Email, Password){
    var data = "UserName=" + Email + "&Password=" + Password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this._http.post(this._baseUrl + '/oauth/token', data, { headers: reqHeader });
  }

  getUserClaims(){
    return this._http.get(this._baseUrl+'/api/Account/UserInfo', {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
   }
}
