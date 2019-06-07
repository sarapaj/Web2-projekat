import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DropdownElement } from 'src/app/shared/classes';
import { TipPutnika } from 'src/app/shared/constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  dropdownToPass: DropdownElement[];
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.dropdownToPass = [
      {
        label: "Tip putnika",
        value: TipPutnika
      }
    ];
  }

}
