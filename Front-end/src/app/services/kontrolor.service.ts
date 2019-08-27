import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KontrolorService {

  private _baseUrl = environment.baseUrl;
  constructor(private _http: HttpClient) { }

  public validateTicket(ticketID:number){
    return this._http.get(`${this._baseUrl}/api/Kontrolor/ValidateTicket?ticketID=${ticketID}`);
  }

  public getUsers(){
    return this._http.get(`${this._baseUrl}/api/Kontrolor/GetUsers`);
  }

  public getDocument(email:string){
    return this._http.get(`${this._baseUrl}/api/Kontrolor/GetImage?userEmail=${email}`);
  }
 
  public validateDocument(email:string, result:boolean){
    return this._http.post(`${this._baseUrl}/api/Kontrolor/ValidateDocument?userEmail=${email}&result=${result}`, email);
  }
  }
  
