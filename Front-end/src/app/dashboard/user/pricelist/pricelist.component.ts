import { Component, OnInit, Input } from '@angular/core';
import { DropdownElement } from 'src/models/classes';
import { CenovnikForma } from 'src/models/cenovnik-forma';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PricelistService } from 'src/app/services/pricelist.service';
import { UserService } from 'src/app/services/user.service';
import { PassengerType, TicketType } from 'src/app/shared/constants';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent implements OnInit {

  dropdownToPassTicket: DropdownElement;
  dropDownToPassPassenger: DropdownElement;

  pricelistForm:CenovnikForma;
  tableHeader: string[];
  price:string;
  tableBody;
  tableBody2;
  selectedTable;
  userRole;

  constructor(private route: ActivatedRoute, private _pricelistService: PricelistService) { }

  ngOnInit() {
    if(this.userRole != 2) { // korisnik
      this.resetForm();
      this.dropDownToPassPassenger = {label: "Tip putnika",value: PassengerType};
      this.dropdownToPassTicket = {label:"Tip karte", value: TicketType};
    }
    else { // admin
      this.getDiscounts();
      this.getTicketTypes();
    }

  }

  getDiscounts() {
    this._pricelistService.getAllDiscounts().subscribe((res: any) =>
    {
      this.tableBody = res.map((discount) => {
        return [ discount.Type, discount.Percent];
      })
    })
  }

  getTicketTypes() {
    this._pricelistService.getAllTicketTypes().subscribe((res: any) =>
    {
      this.tableBody2 = res.map((tp) => {
        return [ tp.Name, tp.Price];
      });
    })
  }

  OnSubmit(form: NgForm) {
    this._pricelistService.getTicketPrice(this.pricelistForm).subscribe((res: any) => {
       this.price = res;

    })
  }

  selectTicketTypeChangeHandler(event:any){
    this.pricelistForm.tipKarte = event.target.value;
  }

  selectPassengerChangeHandler(event:any){
    this.pricelistForm.tipPutnika =  event.target.value;
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.pricelistForm = {
      tipKarte: TicketType[0],
      tipPutnika: PassengerType[0].name
    }
  }
  
}
