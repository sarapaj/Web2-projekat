import { Component, OnInit, Input } from '@angular/core';
import { DropdownElement } from 'src/models/classes';
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
  cena:string;
  tableBody;
  tableBody2;
  selectedTable;
  userRole;

  constructor(private route: ActivatedRoute, private cenovnikServis: CenovnikService,
    private _userService: UserService) { }

  ngOnInit() {
    //this.userRole = this._userService.getUserRole();


    if(this.userRole != 2) { // korisnik
      this.resetForm();
      this.dropDownToPassPassenger = {label: "Tip putnika",value: TipPutnika};
      this.dropdownToPassTicket = {label:"Tip karte", value: TipKarte};
    
      this.tableHeader = ["Cena"];
      this.tableBody = [""];
    }
    else { // admin
      this.getDiscounts();
      this.getTicketTypes();
    }

  }

  getDiscounts() {
    this.cenovnikServis.getAllDiscounts().subscribe((res: any) =>
    {
      this.tableBody = res.map((discount) => {
        return [ discount.Type, discount.Percent];
      })
    })
  }

  getTicketTypes() {
    this.cenovnikServis.getAllTicketTypes().subscribe((res: any) =>
    {
      this.tableBody2 = res.map((tp) => {
        return [ tp.Name, tp.Price];
      });
    })
  }

  OnSubmit(form: NgForm) {
    this.cenovnikServis.getTicketPrice(this.cenovnikForma).subscribe((res: any) => {
       this.cena = res;

    })
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
      tipKarte: TipKarte[0],
      tipPutnika: TipPutnika[0].name
    }
  }
  
}
