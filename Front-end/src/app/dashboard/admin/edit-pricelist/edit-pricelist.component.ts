import { Component, OnInit } from '@angular/core';
import { PricelistService } from 'src/app/services/pricelist.service';
import { DropdownElement } from 'src/models/classes';

@Component({
  selector: 'app-edit-pricelist',
  templateUrl: './edit-pricelist.component.html',
  styleUrls: ['./edit-pricelist.component.css']
})
export class EditPricelistComponent implements OnInit {

  selectedTicketType: number;
  selectedTicketTypePrice: string;
  selectedTicketTypeId: number;
  selectedPassengerType: number;
  selectedDiscount: string;
  selectedDiscountId: number;
  passengerTypesDropdown: DropdownElement;
  ticketTypesDropdown: DropdownElement;
  allTicketTypes: any;
  allPassengerTypes: any;

  constructor( private _pricelistService: PricelistService ) { }

  ngOnInit() {

    this.passengerTypesDropdown = 
    {
      label: "",
      value: []
    };

    this.ticketTypesDropdown = 
    {
      label: "",
      value: []
    };

    this.selectedTicketTypePrice = null;
    this.selectedTicketTypeId = null;
    this.selectedDiscount = null;
    this.selectedDiscountId = null;

    this.showPassengerTypes();
    this.showTicketTypes();
  }

  showPassengerTypes(){
    this._pricelistService.getAllDiscounts().subscribe((res:any) => {
      
      var typesToPrint = res.map(r => {
        return r.Type;
      })
      
      this.allPassengerTypes = res;

      this.passengerTypesDropdown = {
        label: "Tip putnika",
        value: typesToPrint
      }

      this.selectedPassengerType = null;
    })
  }

  showTicketTypes(){
    this._pricelistService.getAllTicketTypes().subscribe((res:any) => {

      var typesToPrint = res.map(r => {
        return r.Name;
      })

      this.allTicketTypes = res;

      this.ticketTypesDropdown = {
        label: "Tip karte",
        value: typesToPrint
      }

      this.selectedTicketType = null;
    })
  }

  changeTicketTypePrice(){
    this._pricelistService.editTicketPrice(this.selectedTicketTypeId, this.selectedTicketTypePrice).subscribe((res: any) => {
      alert("Price is successfully changed");

      this.selectedTicketType = null;
      this.selectedTicketTypePrice = null;
      this.selectedTicketTypeId = null;

      this.showTicketTypes();
    })
  }

  changeDiscount(){
    this._pricelistService.editDiscount(this.selectedDiscountId, this.selectedDiscount).subscribe((res: any) => {
      alert("Discount is successfully changed");
      
      this.selectedPassengerType = null;
      this.selectedDiscount = null;
      this.selectedDiscountId = null;

      this.showPassengerTypes()
    })
  }

  ticketTypeChanged(event: any){

    for(var i = 0; i < this.ticketTypesDropdown.value.length; i++){
      if(this.ticketTypesDropdown.value[i] == this.selectedTicketType){
        this.selectedTicketTypePrice = this.allTicketTypes[i].Price.toString();
        this.selectedTicketTypeId = this.allTicketTypes[i].Id;
        return;
      }
    }
  }

  passengerTypeChanged(event: any){

    for(var i = 0; i < this.passengerTypesDropdown.value.length; i++){
      if(this.passengerTypesDropdown.value[i] == this.selectedPassengerType){
        this.selectedDiscount = this.allPassengerTypes[i].Percent.toString();
        this.selectedDiscountId = this.allPassengerTypes[i].Id;
        return;
      }
    }
  }
}
