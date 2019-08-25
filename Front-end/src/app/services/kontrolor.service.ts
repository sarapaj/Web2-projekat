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
}
