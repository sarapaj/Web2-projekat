import { Component, OnInit } from '@angular/core';
import { ControllerService } from 'src/app/services/controller.service';
import { UserKontrolor } from 'src/models/user-kontrolor';
import { DropdownElement } from 'src/models/classes';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {

  users;
  show:boolean=false;
  buttonName:string;
  imageSrc;
  documentStatus;
  email:string;
  status:boolean;
  result;
  imageUrl;

  constructor(private _controllerService:ControllerService, private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.getUsers();
    this.imageSrc = "http://wiki.tripwireinteractive.com/images/4/47/Placeholder.png";
  }

  selectDocumentStatus(event:any){
    this.documentStatus = event.target.value;
  }

  getUsers(){
    this._controllerService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  getDocument(){
    this._controllerService.getDocument(this.email).subscribe((data:string) => {
      let objectURL = `data:image/jpeg;base64,${data}`;
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

  OnSubmit(form: NgForm) {
    if (this.result == "Validan")
    {
      this.status = true;
    }
    else
    {
      this.status = false;
    }

    this._controllerService.validateDocument(this.email, this.status).subscribe(() => {
      if(this.status == true){
        alert("Dokument je prihvacen");
      }
      else{
        alert("Dokument je odbijen");
      }
      
      this.getUsers();
    },
    () => {
      alert("Neuspesna validacija dokumenta");
    });

    this.resetVariables();
  }

  resetVariables(){
    this.show = false;
    this.email = null;
    this.status = null;
  }

  showDocument(email:string) {
    this.show = true;
    this.email = email;
    this.getDocument();
  }
}
