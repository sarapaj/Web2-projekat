import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RedVoznje } from 'src/models/red-voznje';

@Injectable({
  providedIn: 'root'
})

export class RedVoznjeService {
  private _baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) { }

  public getRedVoznje(dan: string, linija: string) {
    return this._http.get(`${this._baseUrl}/api/Line/GetDepartures/${dan}/${linija}`);
  }

  //TODO obavestiti milicu
  public editRedVoznje(dan: string, linija: string, noviPolazak: RedVoznje[]){
    return this._http.put(`${this._baseUrl}/api/Line/EditDepartures/${dan}/${linija}`, noviPolazak);
  }

}
