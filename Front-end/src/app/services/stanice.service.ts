import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Stanica } from 'src/models/stanica';
import { Linija } from 'src/models/linija';
import { LinijinaStanica } from 'src/models/linijina-stanica';

@Injectable({
  providedIn: 'root'
})
export class StaniceService {
  private _baseUrl = environment.baseUrl;
  constructor(private _http: HttpClient) { }

  public getAllStations(){
    return this._http.get(`${this._baseUrl}/api/Station/GetAll`);
  }

  public editStation(nazivStanice: string, stanica: Stanica){
    return this._http.put(`${this._baseUrl}/api/Stations/EditStation/${nazivStanice}`, stanica);
  }

  public deleteStation(nazivStanice: string){
    return this._http.delete(`${this._baseUrl}/api/Stations/DeleteStation/${nazivStanice}`);
  }

  public addStationToLine(stanica: LinijinaStanica, linija: Linija){
    const data = {
      linija,
      stanica: stanica.stanica,
      rbr: stanica.rbr
    }
    return this._http.post(`${this._baseUrl}/api/Stations/AddStationToLine`, data);
  }
}
