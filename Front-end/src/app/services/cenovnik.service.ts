import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CenovnikService {
  private _baseUrl = environment.baseUrl;
  constructor(private _http: HttpClient) { }

  public editTicketPrice(novaCena: number, tipKarte: string){
    return this._http.put(`${this._baseUrl}/api/Ticket/EditTicketPrice/${tipKarte}/${novaCena}`, {});
  }

  public editDiscount(noviPopust: number, tipPutnika: string){
    return this._http.put(`${this._baseUrl}/api/Ticket/EditDiscount/${tipPutnika}/${noviPopust}`, {});
  }

  public getTicketPrice(tipKarte: string, tipPutnika: string){
    return this._http.get(`${this._baseUrl}/api/Ticket/GetTicketPrice/${tipKarte}/${tipKarte}`);
  }
}
