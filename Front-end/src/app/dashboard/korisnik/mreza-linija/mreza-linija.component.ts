import { Component, OnInit } from '@angular/core';
import { DropdownElement } from 'src/app/shared/classes';
import { LinijePrivremeno } from 'src/app/shared/constants';

@Component({
  selector: 'app-mreza-linija',
  templateUrl: './mreza-linija.component.html',
  styleUrls: ['./mreza-linija.component.css']
})
export class MrezaLinijaComponent implements OnInit {
  
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
