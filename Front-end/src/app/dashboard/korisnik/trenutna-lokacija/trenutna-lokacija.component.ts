import { Component, OnInit } from '@angular/core';
import { DropdownElement } from 'src/models/classes';
import { LinijePrivremeno } from 'src/app/shared/constants';

@Component({
  selector: 'app-trenutna-lokacija',
  templateUrl: './trenutna-lokacija.component.html',
  styleUrls: ['./trenutna-lokacija.component.css']
})
export class TrenutnaLokacijaComponent implements OnInit {
  
  dropdownToPass: DropdownElement[];

  constructor() { }

  ngOnInit() {
    this.dropdownToPass = [
      {
        label: "Linije",
        value: LinijePrivremeno
      }
    ];
  }

}
