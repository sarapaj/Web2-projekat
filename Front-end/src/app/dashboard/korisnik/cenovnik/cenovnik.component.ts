import { Component, OnInit } from '@angular/core';
import { DropdownElement } from 'src/app/shared/classes';
import { TipKarte, TipPutnika } from 'src/app/shared/constants';

@Component({
  selector: 'app-cenovnik',
  templateUrl: './cenovnik.component.html',
  styleUrls: ['./cenovnik.component.css']
})
export class CenovnikComponent implements OnInit {

  dropdownToPass: DropdownElement[];
  tableHeader: string[];

  constructor() { }

  ngOnInit() {
    this.dropdownToPass = [
      {
        label: "Tip karte",
        value: TipKarte
      },
      {
        label: "Tip putnika",
        value: TipPutnika
      }
    ];
    this.tableHeader = ["Tip karte", "Tip putnika", "Cena", " "];

  }

}
