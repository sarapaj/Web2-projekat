import { Component, OnInit, Input } from '@angular/core';
import { DropdownElement } from 'src/app/shared/classes';
import { TipKarte, TipPutnika } from 'src/app/shared/constants';
import { CenovnikForma } from 'src/models/cenovnik-forma';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RedVoznjeService } from 'src/app/services/red-voznje.service';
import { CenovnikService } from 'src/app/services/cenovnik.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cenovnik',
  templateUrl: './cenovnik.component.html',
  styleUrls: ['./cenovnik.component.css']
})
export class CenovnikComponent implements OnInit {

  dropdownToPassTicket: DropdownElement;
  dropDownToPassPassenger: DropdownElement;

  cenovnikForma:CenovnikForma;
  tableHeader: string[];
  tableBody: string[];
  tableBody2: string[];

  userRole;

  constructor(private route: ActivatedRoute, private cenovnikServis: CenovnikService,
    private _userService: UserService) { }

  ngOnInit() {
    this.userRole = this._userService.getUserRole();

    if(this.userRole == 1) { // korisnik
      this.resetForm();
      this.dropDownToPassPassenger = {label: "Tip putnika",value: TipPutnika};
      this.dropdownToPassTicket = {label:"Tip karte", value: TipKarte};
    
      this.tableHeader = ["Cena"];
      this.tableBody = [""];
    }
    else if( this.userRole == 2) { // admin
      
    }

  }
  OnSubmit(form: NgForm) {
    this.cenovnikServis.getTicketPrice(this.cenovnikForma);
    this.tableBody = [this.cenovnikServis.cena];
  }

  selectTicketTypeChangeHandler(event:any){
    this.cenovnikForma.tipKarte = event.target.value;
  }

  selectPassengerChangeHandler(event:any){
    this.cenovnikForma.tipPutnika =  event.target.value;
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.cenovnikForma = {
      tipKarte: '',
      tipPutnika: '',
    }
  }
  

}
