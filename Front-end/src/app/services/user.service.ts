import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/models/korisnik';
import { UserClaims } from 'src/models/user-claims';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private _baseUrl = environment.baseUrl;
  userRole;
  userClaims: UserClaims = new UserClaims();
  
  constructor(private _http: HttpClient) {
  }

  setUserRole() {
    return new Observable(obs => {
      this.getUserClaims().subscribe(claim => {
        this.fetchUserRole(claim).subscribe(role => {
          obs.next(role);
          obs.complete();
        })
      });
    })
  }

  setRole(role) {
    this.userRole = role;
    localStorage.setItem('role', this.userRole);
  }

  fetchUserRole(claim) {
    return this._http.get(this._baseUrl + '/api/Ticket/GetUserRole?Email=' + (claim as any).Email);
  }

  checkIsDocumentValid(email:string)
  {
    return this._http.get(`${this._baseUrl}/api/Controller/IsDocumentValid?userEmail=${email}`);
  }

  getUserRole() {
    return this.userRole;
  }

  userAuthentication(Email, Password){
    var data = "UserName=" + Email + "&Password=" + Password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this._http.post(this._baseUrl + '/oauth/token', data, { headers: reqHeader });
  }

  getUserClaims(){
    return this._http.get(this._baseUrl+'/api/Account/UserInfo', {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }

  getAllUserInfo(){
    return this._http.get(this._baseUrl+'/api/Account/GetAllUserInfo', {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }

  registerUser(user:User, imageName: string)
  {
    let fd = new FormData();

    fd.append("Email", user.Email);
    fd.append("Password", user.Password);
    fd.append("ConfirmPassword", user.ConfirmPassword);
    fd.append("Name", user.Name);
    fd.append("Surname", user.Surname);
    fd.append("Address", user.Address);
    fd.append("PassengerType", user.PassengerType);
    fd.append("Birthday", user.Birthday.toDateString());
    
    if(user.Document != null){
      fd.append("Document", user.Document);
      fd.append("ImageName", imageName);
    }
    
    return this._http.post(this._baseUrl + '/api/Account/Register', fd);
  }  

  postFile(fileToSend: any, imageName: string, username: string){
    let fd = new FormData();
    fd.append("User", username);
    fd.append("Document", fileToSend);
    fd.append("ImageName", imageName);
    return this._http.post(this._baseUrl + '/api/Account/PostFile', fd, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }

  changeUserInfo(updatedUser: User){
    let fd = new FormData();
    fd.append("Email", updatedUser.Email);
    fd.append("Name", updatedUser.Name);
    fd.append("Surname", updatedUser.Surname);
    fd.append("Address", updatedUser.Address);
    fd.append("PassengerType", updatedUser.PassengerType);
    fd.append("Birthday", updatedUser.Birthday.toDateString());

    return this._http.post(this._baseUrl + '/api/Account/ChangeUserInfo', fd, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }

  public changePassword(oldPassword: string, newPassword: string, confirmPassword: string){
    var data = {
      OldPassword: oldPassword,  
      NewPassword: newPassword,
      ConfirmPassword: confirmPassword
    }
    return this._http.post(this._baseUrl + '/api/Account/ChangePassword', data, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});    
  }

}
