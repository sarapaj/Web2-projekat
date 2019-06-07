import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-karte',
  templateUrl: './karte.component.html',
  styleUrls: ['./karte.component.css']
})
export class KarteComponent implements OnInit {

  vrednostKarte: boolean = true;
  validnostKarte: string;
  constructor() { }

  ngOnInit() {
    if(this.vrednostKarte){
      this.validnostKarte = "validna";
    }
    else{
      this.validnostKarte = "nevalidna";
    }
  }

}
