import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  public getRedVoznje(redVoznjeForma:RedVoznjeForma) {
    return this._http.get(this._baseUrl + '/api/Line/GetDepartures?day=' +redVoznjeForma.day + '&lineName=' + redVoznjeForma.lineName);
  }


  public editRedVoznje(dan: string, linija: string, noviPolazak: RedVoznje[]){
    return this._http.put(`${this._baseUrl}/api/Line/EditDepartures/${dan}/${linija}`, noviPolazak);
  }

}
