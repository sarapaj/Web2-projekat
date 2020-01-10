import { Component, OnInit } from '@angular/core';
import { DropdownElement } from 'src/models/classes';
import { TemporarelyLines } from 'src/app/shared/constants';

@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.component.html',
  styleUrls: ['./current-location.component.css']
})
export class CurrentLocationComponent implements OnInit {
  
  dropdownToPass: DropdownElement[];

  constructor() { }

  ngOnInit() {
    this.dropdownToPass = [
      {
        label: "Lines",
        value: TemporarelyLines
      }
    ];
  }

}
