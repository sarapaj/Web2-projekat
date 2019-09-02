import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KarteService } from 'src/app/services/karte.service';
import { Karta } from 'src/models/karta';
import { TipKarte } from 'src/app/shared/constants';
import { DropdownElement } from 'src/models/classes';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/korisnik';

@Component({
  selector: 'app-kupovina-karte',
  templateUrl: './kupovina-karte.component.html',
  styleUrls: ['./kupovina-karte.component.css']
})
export class KupovinaKarteComponent implements OnInit {

  constructor(private _karteServis: KarteService, private _userService: UserService) {}
    
  username: string;
  karte: Karta[];
  dropdownToPassTicket: DropdownElement;
  tipKarte: string;
  isDocumentValid;
  documentStatus;
  user = new User;

  ngOnInit() {
    this.resetForm();
    this.username = localStorage.getItem("email");
    this.checkDocument(); //true ili false da li je valid
    this.getDocumentStatusMessage(); //poruka o statusu obrade dokumenta
    this.getMyTickets();
    this.getUserInfo();

    this.dropdownToPassTicket = {label:"Tip karte", value: TipKarte};
  }

  getMyTickets(){
    this._karteServis.getAllTickets(this.username).subscribe(data => {
      this.karte = data;
    });
  }

  getUserInfo(){
    this._userService.getAllUserInfo().subscribe((data: User) =>{
      this.user = data;
      console.log(this.user.PassengerType)
    })
  }

  checkDocument()
  {
    this._userService.checkIsDocumentValid(this.username).subscribe(data =>{
      this.isDocumentValid = data;
    })
  }

  getDocumentStatusMessage()
  {
    this._userService.checkDocumentStatus(this.username).subscribe(data =>{
      this.documentStatus = data;
    })
  }

  getDocumentStatus()
  {

  }

  selectTicketTypeChangeHandler(event:any){
    this.tipKarte = event.target.value;
  }

  OnSubmit(form: NgForm) {
    this._karteServis.buyTicket(this.username, this.tipKarte).subscribe(() => {
      this.getMyTickets();
    })
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
      this.tipKarte = TipKarte[0];
    }

}
