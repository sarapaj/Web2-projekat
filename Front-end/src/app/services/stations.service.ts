import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StationsService {
  private _baseUrl = environment.baseUrl;
  constructor(private _http: HttpClient) { }

  public getAllStations(){
    return this._http.get(`${this._baseUrl}/api/Station/GetAll`);
  }

  public editStation(name: string, id: string, address: string, x: string, y: string){
    let fd = new FormData;
    fd.append("Id", id);
    fd.append("Name", name);
    fd.append("Address", address);
    fd.append("xCoord", x);
    fd.append("yCoord", y);
    return this._http.put(`${this._baseUrl}/api/Station/EditStation`, fd, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }

  public deleteStation(nazivStanice: string){
    return this._http.delete(`${this._baseUrl}/api/Station/DeleteStation?name=${nazivStanice}`, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }

  public addStation(stationName: string, stationAddress: string, coordinateId: string){
    let fd = new FormData;
    fd.append("Name", stationName);
    fd.append("Address", stationAddress);
    fd.append("coordId", coordinateId);
    return this._http.post(`${this._baseUrl}/api/Station/AddStation`, fd, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }
  public getStationNames(){
    return this._http.get(`${this._baseUrl}/api/Station/GetStationNames`);
  }

  public getStationByName(name: string){
    return this._http.get(`${this._baseUrl}/api/Station/GetStationByName?name=${name}`);
  }

  public getAllCoordinates(){
    return this._http.get(`${this._baseUrl}/api/Station/GetAllCoordinates`);
  }

  public addNewCoordinate(x: string, y: string){
    let fd = new FormData;
    fd.append("xCoord", x);
    fd.append("yCoord", y);
    return this._http.post(`${this._baseUrl}/api/Station/AddCoordinate`, fd, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }
}
