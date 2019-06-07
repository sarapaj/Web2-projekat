import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DropdownElement } from 'src/app/shared/classes';
import { TipRedaVoznje, TipDana, LinijePrivremeno } from 'src/app/shared/constants';

@Component({
  selector: 'app-red-voznje',
  templateUrl: './red-voznje.component.html',
  styleUrls: ['./red-voznje.component.css']
})
export class RedVoznjeComponent implements OnInit {

  dropdownToPass: DropdownElement[];
  tableHeader: string[];
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.dropdownToPass = [
      {
        label: "Red voznje",
        value: TipRedaVoznje
      },
      {
        label: "Dan",
        value: TipDana
      },
      {
        label: "Linije",
        value: LinijePrivremeno
      }
    ];

    this.tableHeader = ["Smer A", "Smer B"];
  }
}
