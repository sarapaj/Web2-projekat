import { Injectable, ɵConsole } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Karta } from 'src/models/karta';

@Injectable({
  providedIn: 'root'
})
export class KarteService {
  private _baseUrl = environment.baseUrl;
  constructor(private _http: HttpClient) { }

  public getTicketTypes(){
    return this._http.get(`${this._baseUrl}/api/Ticket/GetTicketTypes`);
  }

  public buyTicket(username: string, ticketType:string){
    const data: any = {
      ticketType: ticketType,
      email: username      
    }
    return this._http.post(`${this._baseUrl}/api/Ticket/AddTicket?ticketType=${ticketType}&email=${username}`, data, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }

  public getAllTickets(username: string): Observable<Karta[]>{

    console.log("usao");
    return this._http.get<Karta[]>(`${this._baseUrl}/api/Ticket/GetAllTickets?email=${username}`);
  }
  // metoda validateTicket
}
