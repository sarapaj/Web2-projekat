import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketsService } from 'src/app/services/tickets.service';
import { Karta } from 'src/models/karta';
import { DropdownElement } from 'src/models/classes';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/korisnik';
import { TicketType } from 'src/app/shared/constants';

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

  ngOnInit() {
    this.resetForm();
    this.username = localStorage.getItem("email");
    this.checkDocument();
    this.getMyTickets();
    this.getUserInfo();

    this.dropdownToPassTicket = {label:"Ticket type", value: TicketType};
  }

  getMyTickets(){
    this._ticketsService.getAllTickets(this.username).subscribe(data => {
      this.tickets = data;
    });
  }

  getUserInfo(){
    this._userService.getAllUserInfo().subscribe((data: User) =>{
      this.user = data;
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
  }

  OnSubmit(form: NgForm) {
    this._ticketsService.buyTicket(this.username, this.ticketType).subscribe(() => {
      this.getMyTickets();
    })
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
      this.ticketType = TicketType[0];
    }

}
