import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
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
    console.log(data);
    return this._http.post(`${this._baseUrl}/api/Line/AddLine`, data);
  }

  public editLine(linija: Linija, nazivLinije: string){
    return this._http.put(`${this._baseUrl}/api/Line/EditLine/${nazivLinije}`, linija);
  }

  public deleteLine(nazivLinije: string){
    return this._http.delete(`${this._baseUrl}/api/Line/DeleteLine?name=${nazivLinije}`);
  }
  
  public getLineByName(name: number){
    this.nameToPass = String(name);
    return this._http.get(`${this._baseUrl}/api/Line/GetLineByName?name=${this.nameToPass}`);
  }
}
