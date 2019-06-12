import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KarteService {
  private _baseUrl = environment.baseUrl;
  constructor(private _http: HttpClient) { }

  public getTicketTypes(){
    return this._http.get(`${this._baseUrl}/api/Ticket/GetTicketTypes`);
  }

  // metoda validateTicket
}
