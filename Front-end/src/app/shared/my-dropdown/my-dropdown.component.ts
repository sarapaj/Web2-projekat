import { Component, OnInit, Input } from '@angular/core';
import { DropdownElement } from '../classes';

@Component({
  selector: 'app-my-dropdown',
  templateUrl: './my-dropdown.component.html',
  styleUrls: ['./my-dropdown.component.css']
})
export class MyDropdownComponent implements OnInit {

  @Input() dropdownElement;

  constructor() { }

  ngOnInit() {
  }

}