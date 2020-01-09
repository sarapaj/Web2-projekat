import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CenovnikForma } from 'src/models/cenovnik-forma';

@Injectable({
  providedIn: 'root'
})
export class CenovnikService {
  private _baseUrl = environment.baseUrl;
  cena : string;

  constructor(private _http: HttpClient) { }

  public editTicketPrice(id: number, price: string){
    let fd = new FormData;
    fd.append("Id", id.toString());
    fd.append("Price", price);

    return this._http.put(`${this._baseUrl}/api/Ticket/EditTicketPrice`, fd, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }

  public editDiscount(id: number, percent: string){
    let fd = new FormData;
    fd.append("Id", id.toString());
    fd.append("Percent", percent);

    return this._http.put(`${this._baseUrl}/api/Ticket/EditDiscount`, fd, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }

  public getTicketPrice(cenovnikForma:CenovnikForma){
    return this._http.get(`${this._baseUrl}/api/Ticket/GetTicketPrice?TicketType=${cenovnikForma.tipKarte}&PassengerType=${cenovnikForma.tipPutnika}`);
  }

  public getAllTicketTypes(){
    return this._http.get(`${this._baseUrl}/api/Ticket/GetAllTicketTypes`);
  }

  public getAllDiscounts(){
    return this._http.get(`${this._baseUrl}/api/Ticket/GetAllDiscounts`);
  }
}
