import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketsService } from 'src/app/services/tickets.service';
import { Karta } from 'src/models/karta';
import { DropdownElement } from 'src/models/classes';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/korisnik';
import { TicketType } from 'src/app/shared/constants';

import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { PricelistService } from 'src/app/services/pricelist.service';

@Component({
  selector: 'app-ticket-buy',
  templateUrl: './ticket-buy.component.html',
  styleUrls: ['./ticket-buy.component.css']
})
export class TicketBuyComponent implements OnInit {

  constructor(private _ticketsService: TicketsService, private _userService: UserService) {}
    
  username: string;
  tickets: Karta[];
  dropdownToPassTicket: DropdownElement;
  ticketType: string;
  isDocumentValid;
  documentStatus;
  user = new User;
  billingPrice;
  passengerType;
  // paypal
  showSuccess;
  showError;
  showCancel;

  public payPalConfig?: IPayPalConfig;


  ngOnInit() {
    this.dropdownToPassTicket = {label:"Ticket type", value: TicketType};
    this.ticketType = this.dropdownToPassTicket.value[0];
    this.getUserInfo();
    this.username = localStorage.getItem("email");
    this.checkDocument();
    this.getMyTickets();
    
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: this.billingPrice,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: this.billingPrice
                }
              }
            },
            items: [
              {
                name: this.ticketType,
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: this.billingPrice,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
        this.InformServer();
        alert("Ticket purchasing went successfully");
        this.getMyTickets();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  getMyTickets(){
    this._ticketsService.getAllTickets(this.username).subscribe(data => {
      this.tickets = data;
    });
  }

  getUserInfo(){
    this._userService.getAllUserInfo().subscribe((data: User) => {
      this.user = data;

      if(this.user.PassengerType == "0"){
        this.passengerType = "djak";
      }
      else if(this.user.PassengerType == "1"){
        this.passengerType = "penzioner";
      }
      else if(this.user.PassengerType == "2"){
        this.passengerType = "regularni";
      }
      this.getTicketPrice();
    })
  }

  checkDocument()
  {
    this._userService.checkIsDocumentValid(this.username).subscribe(data =>{
      this.documentStatus = data;
      if(data == "Prihvacen"){
        this.isDocumentValid = true;
      }
      else{
        this.isDocumentValid = false;
      }
    })
  }

  selectTicketTypeChangeHandler(event:any){
    this.ticketType = event.target.value;
    this.getTicketPrice();  
  }

  getTicketPrice(){
    this._ticketsService.getTicketPrice(this.ticketType, this.passengerType).subscribe((res: any) => {
      this.billingPrice = res;
   })
  }

  InformServer() {
    this._ticketsService.buyTicket(this.username, this.ticketType).subscribe(() => {
      this.getMyTickets();
    })
  }

}
