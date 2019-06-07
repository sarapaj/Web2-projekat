import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uredi-stanice',
  templateUrl: './uredi-stanice.component.html',
  styleUrls: ['./uredi-stanice.component.css']
})
export class UrediStaniceComponent implements OnInit {

  tableHeader: string[];

  constructor() { }

  ngOnInit() {
    this.tableHeader = ["Naziv", "Adresa", "Koordinate", " "];
  }

}
