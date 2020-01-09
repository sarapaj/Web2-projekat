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

  public deleteRedVoznje(day: string, line: string) {
    // let fd = new FormData;
    // fd.append("Day", day);
    // fd.append("Line", line);
    // fd.append("Departure", departure);
    return this._http.delete(`${this._baseUrl}/api/Line/DeleteDepartures?lineName=${line}&day=${day}`, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }

  public editRedVoznje(day: string, line: string, newDeparture: string){
    let fd = new FormData;
    fd.append("Day", day);
    fd.append("Line", line);
    fd.append("NewDeparture", newDeparture);
    return this._http.put(`${this._baseUrl}/api/Line/EditDepartures`, fd, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }
  
  public addDeparture(day: string, line: string, newDeparture: string){
    let fd = new FormData;
    fd.append("Day", day);
    fd.append("Line", line);
    fd.append("NewDeparture", newDeparture);
    return this._http.post(`${this._baseUrl}/api/Line/AddDeparture`, fd, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }
}
