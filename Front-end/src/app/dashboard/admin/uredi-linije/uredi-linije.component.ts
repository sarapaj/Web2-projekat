import { Component, OnInit } from '@angular/core';
import { DropdownElement } from 'src/app/shared/classes';
import { LinijePrivremeno } from 'src/app/shared/constants';

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

  constructor() { }

  ngOnInit() {
    this.dropdownToPassLine = 
      {
        label: "Linije",
        value: LinijePrivremeno
      };

    this.tableHeader = ["Redni broj", "Naziv", " "];
    this.tableBody = [
      ["1", "13", ""],
      ["2", "7a", ""],
      ["3", "20", ""],
    ]

  }

  onLineSelected(item) {
    this.selectedLine = item;
  }

  showLineDetails() {

  }

}
