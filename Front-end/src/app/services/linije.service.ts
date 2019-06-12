import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Linija } from 'src/models/linija';

@Injectable({
  providedIn: 'root'
})
export class LinijeService {
  private _baseUrl = environment.baseUrl;
  constructor(private _http: HttpClient) { }

  public getLineNames(){
    return this._http.get(`${this._baseUrl}/api/Line/GetLineNames`);
  }

  public getAllLines(){
    return this._http.get(`${this._baseUrl}/api/Line/GetAll`);
  }

  public addNewLine(linija: Linija){
    return this._http.post(`${this._baseUrl}/api/Line/AddLine`, linija);
  }

  public editLine(linija: Linija, nazivLinije: string){
    return this._http.put(`${this._baseUrl}/api/Line/EditLine/${nazivLinije}`, linija);
  }

  public deleteLine(linija: Linija, nazivLinije: string){
    return this._http.delete(`${this._baseUrl}/api/Line/DeleteLine/${nazivLinije}`);
  }
  
  public getLineById(id: number){
    id = 1;
    return this._http.get(`${this._baseUrl}/api/Line/GetLineById?id=${id}`);
  }
}
