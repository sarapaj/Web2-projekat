import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KarteService } from 'src/app/services/karte.service';
import { KontrolorService } from 'src/app/services/kontrolor.service';

@Component({
  selector: 'app-karte',
  templateUrl: './karte.component.html',
  styleUrls: ['./karte.component.css']
})
export class KarteComponent implements OnInit {

  vrednostKarte: boolean;
  validnostKarte: string;
  ID:number;
  constructor(private router: Router, private kontrolorService:KontrolorService) { }

  ngOnInit() {
   
  }

  OnSubmit()
  {
    this.kontrolorService.validateTicket(this.ID).subscribe((res: any) => {
      this.vrednostKarte = res;

      if(this.vrednostKarte == true){
        this.validnostKarte = "validna";
        }
        else{
          this.validnostKarte = "nevalidna";
        }
   },
   (err) => {
     this.ID = null;
     alert("Nepostojeca vrednost ID-a");
   })
  }
}
