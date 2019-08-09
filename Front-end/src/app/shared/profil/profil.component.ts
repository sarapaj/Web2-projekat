import { Component, OnInit } from '@angular/core';
import { DropdownElement } from '../../../models/classes';
import { TipPutnika } from '../constants';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  dropdownToPass: DropdownElement[];

  constructor() { }

  ngOnInit() {
    this.dropdownToPass = [
      {
        label: "Tip putnika",
        value: TipPutnika
      }
    ];
  }

}
