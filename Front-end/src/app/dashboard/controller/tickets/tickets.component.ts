import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControllerService } from 'src/app/services/controller.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  ticketValue: boolean;
  ticketStatus: string;
  ID:number;
  constructor(private router: Router, private _controllerService:ControllerService) { }

  ngOnInit() {
   
  }

  OnSubmit()
  {
    this._controllerService.validateTicket(this.ID).subscribe((res: any) => {
      this.ticketValue = res;

      if(this.ticketValue == true){
        this.ticketStatus = "validna";
        }
        else{
          this.ticketStatus = "nevalidna";
        }
   },
   (err) => {
     this.ID = null;
     alert("Nepostojeca vrednost ID-a");
   })
  }
}
