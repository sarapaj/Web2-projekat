import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KarteService } from 'src/app/services/karte.service';
import { Karta } from 'src/models/karta';
import { TipKarte } from 'src/app/shared/constants';
import { DropdownElement } from 'src/models/classes';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-kupovina-karte',
  templateUrl: './kupovina-karte.component.html',
  styleUrls: ['./kupovina-karte.component.css']
})
export class KupovinaKarteComponent implements OnInit {

  constructor(private _karteServis: KarteService) {}
    
  username: string;
  karte: Karta[];
  dropdownToPassTicket: DropdownElement;
  tipKarte: string;

  ngOnInit() {
    this.resetForm();
    this.username = localStorage.getItem("email");
    this.getMyTickets();

    this.dropdownToPassTicket = {label:"Tip karte", value: TipKarte};
  }

  getMyTickets(){
    this._karteServis.getAllTickets(this.username).subscribe(data => {
      
      this.karte = data;
    
    });
  }

  selectTicketTypeChangeHandler(event:any){
    this.tipKarte = event.target.value;
    console.log("tip karte: " + this.tipKarte);
  }

  OnSubmit(form: NgForm) {
    this._karteServis.buyTicket(this.username, this.tipKarte).subscribe();
    this.getMyTickets();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
      this.tipKarte = TipKarte[0];
    }

}
