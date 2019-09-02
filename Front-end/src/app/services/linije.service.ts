import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Linija } from 'src/models/linija';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class LinijeService {
  
  nameToPass: string;
  private _baseUrl = environment.baseUrl;
  constructor(private _http: HttpClient) { }

  public getLineNames(){
    return this._http.get(`${this._baseUrl}/api/Line/GetLineNames`);
  }

  public getAllLines(){
    return this._http.get(`${this._baseUrl}/api/Line/GetAll`);
  }

  public addNewLine(naziv: string, oblast: number){
    const data: any = {
      name: naziv,
      region: oblast      
    }
    return this._http.post(`${this._baseUrl}/api/Line/AddLine`, data, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }

  public editLine(line: Linija){
    let fd = new FormData;
    fd.append("Id", line.id.toString());
    fd.append("Name", line.nazivLinije);
    fd.append("Region", line.region.toString());
    return this._http.put(`${this._baseUrl}/api/Line/EditLine`, fd, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }

  public deleteLine(nazivLinije: string){
    return this._http.delete(`${this._baseUrl}/api/Line/DeleteLine?name=${nazivLinije}`, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }
  
  public getLineByName(name: string){
    this.nameToPass = String(name);
    return this._http.get(`${this._baseUrl}/api/Line/GetLineByName?name=${this.nameToPass}`);
  }

  public getBelongingStations(lineId: number){
    return this._http.get(`${this._baseUrl}/api/Line/GetBelongingStations?lineId=${lineId}`);
  }

  public removeStationFromLine(stationName: string, lineId: number){
    let fd = new FormData;
    fd.append("StationName", stationName);
    fd.append("LineId", lineId.toString());
    return this._http.put(`${this._baseUrl}/api/Line/RemoveStationFromLine`, fd, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});
  }

  public addStationToLine(lineId: number, stationName: string){
    let fd = new FormData;
    fd.append("LineId", lineId.toString());
    fd.append("StationName", stationName);
    return this._http.post(`${this._baseUrl}/api/Line/AddStationToLine`, fd, {headers: new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})});    
  }
}
