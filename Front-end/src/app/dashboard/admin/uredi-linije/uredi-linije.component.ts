import { Component, OnInit } from '@angular/core';
import { DropdownElement } from 'src/app/shared/classes';
import { LinijePrivremeno } from 'src/app/shared/constants';
import { LinijeService } from 'src/app/services/linije.service';

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

  constructor( private _http: LinijeService ) { }

  ngOnInit() {
    this.dropdownToPassLine = 
      {
        label: "",
        value: []
      };

      this.showLineNames();

    this.tableHeader = ["Redni broj", "Naziv", " "];
    // this.tableBody = [
    //   ["1", "13", ""],
    //   ["2", "7a", ""],
    //   ["3", "20", ""],
    // ]

  }

  // onLineSelected(item) {
  //   this.selectedLine = item;
  // }

  showLineDetails() {
    this._http.getLineById(this.selectedLine).subscribe((res: any) =>
    {
      this.tableBody = [[String(res.Id), res.Name, ""]];
    })
  }

  showLineNames(){
    this._http.getLineNames().subscribe((res: any) =>
    {
      this.dropdownToPassLine = {
        label: "Linije",
        value: [res]
      }
    })
  }

}
