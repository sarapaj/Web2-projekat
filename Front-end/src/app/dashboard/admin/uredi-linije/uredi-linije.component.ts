import { Component, OnInit } from '@angular/core';
import { DropdownElement } from 'src/app/shared/classes';
import { LinijePrivremeno } from 'src/app/shared/constants';
import { LinijeService } from 'src/app/services/linije.service';
import { Linija } from 'src/models/linija';

@Component({
  selector: 'app-uredi-linije',
  templateUrl: './uredi-linije.component.html',
  styleUrls: ['./uredi-linije.component.css']
})
export class UrediLinijeComponent implements OnInit {
  
  dropdownToPassLine: DropdownElement;
  tableHeader: string[];
  tableBody;
  selectedLine = 13;
  showForm = false;
  newLineRegion = 2;
  newLineName = "";
  newLine: Linija;

  constructor( private _http: LinijeService ) { }

  ngOnInit() {
    this.dropdownToPassLine = 
      {
        label: "",
        value: []
      };

      this.showLineNames();

    this.tableHeader = ["Redni broj", "Naziv", " "];


  }

  showLineDetails() {
    this._http.getLineByName(this.selectedLine).subscribe((res: any) =>
    {
      this.tableBody = [[String(res.Id), res.Name]];
    })
  }

  showLineNames(){
    this._http.getLineNames().subscribe((res: any) =>
    {
      this.dropdownToPassLine = {
        label: "Linije",
        value: res
      }
    })
  }

  onClick(name) {
    this._http.deleteLine(name).subscribe(res =>
      {
        this.refreshPage();
      })
  }

  refreshPage(){
    // refresh stranice
    window.location.reload();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addNewLine(){

    // console.log("Od forme:");
    // console.log(`naziv linije: ${this.newLineName}`);
    // console.log(`broj regiona: ${this.newLineRegion}`);

    
    this._http.addNewLine(this.newLineName, this.newLineRegion).subscribe((res) =>
    {
      return res;
    });

    this.refreshPage();
  }
}
