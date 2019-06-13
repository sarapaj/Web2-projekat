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
  constructor(private _http: HttpClient) { }

  registerUser(user:User)
  {
    const body: User = {
      Email: user.Email,
      Password: user.Password,
      ConfirmPassword: user.ConfirmPassword,      
    }

    return this._http.post(this._baseUrl + '/api/Account/Register', body);
  }

  getUserRole(){
    // 1 - korisnik, 2 - admin, 3 - kontroler, ostalo - neregistrovani korisnik
    this.userRole = 2;

    this.getUserClaims().subscribe((data : any) => {
      this.userClaims = data; 
    });

    return this._http.get(this._baseUrl + '/api/Ticket/GetUserRole?Email=' +this.userClaims.Email);
  }

  userAuthentication(Email, Password){
    var data = "UserName=" + Email + "&Password=" + Password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this._http.post(this._baseUrl + '/oauth/token', data, { headers: reqHeader });
  }

  getUserClaims(){
    return  this._http.get(this._baseUrl+'/api/Account/UserInfo', {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
   }
}
