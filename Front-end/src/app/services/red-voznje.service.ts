import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RedVoznje } from 'src/models/red-voznje';
import { Departure } from 'src/models/departure';
import { RedVoznjeForma } from 'src/models/red-voznje-forma';

@Injectable({
  providedIn: 'root'
})

export class RedVoznjeService {
  
  private _baseUrl = environment.baseUrl;
  list : string[];
  departure:Departure;

  constructor(private _http: HttpClient) { }

  public getRedVoznje(day: string, lineName: string) {
    return this._http.get(this._baseUrl + '/api/Line/GetDepartures?day=' + day + '&lineName=' + lineName);
  }

  public editRedVoznje(day: string, line: string, newDeparture: string){
    return this._http.put(`${this._baseUrl}/api/Line/EditDepartures/${day}/${line}`, newDeparture, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }

}
