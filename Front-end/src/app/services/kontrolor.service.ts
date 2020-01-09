import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KontrolorService {

  private _baseUrl = environment.baseUrl;
  constructor(private _http: HttpClient) { }

  public validateTicket(ticketID:number){
    return this._http.get(`${this._baseUrl}/api/Kontrolor/ValidateTicket?ticketID=${ticketID}`, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }

  public getUsers(){
    return this._http.get(`${this._baseUrl}/api/Kontrolor/GetUsersToValidate`, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }

  public getDocument(email:string){
    return this._http.get(`${this._baseUrl}/api/Kontrolor/GetImage?userEmail=${email}`, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }
 
  public validateDocument(email:string, result:boolean){
    return this._http.post(`${this._baseUrl}/api/Kontrolor/ValidateDocument?userEmail=${email}&result=${result}`, email, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }
}
  
