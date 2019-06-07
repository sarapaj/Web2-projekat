import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-putnici',
  templateUrl: './putnici.component.html',
  styleUrls: ['./putnici.component.css']
})
export class PutniciComponent implements OnInit {

  tableHeader: string[];

  constructor() { }

  ngOnInit() {
    this.tableHeader = ["Dokaz", "Tip putnika", "Ime", "Prezime", "Datum rodjenja", "Adresa", " ", " "];
  }

}
