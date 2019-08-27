import { Component, OnInit } from '@angular/core';
import { KontrolorService } from 'src/app/services/kontrolor.service';
import { UserKontrolor } from 'src/models/user-kontrolor';
import { DropdownElement } from 'src/models/classes';
import { validacijaDokumenta } from 'src/app/shared/constants';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-putnici',
  templateUrl: './putnici.component.html',
  styleUrls: ['./putnici.component.css']
})
export class PutniciComponent implements OnInit {

  tableHeader: string[];
  users;
  show:boolean=false;
  buttonName:string;
  imageSrc;
  dropdownToPassDocument: DropdownElement;
  documentStatus;
  email:string;
  status:boolean;
  result;

  constructor(private kontrolorService:KontrolorService) { }

  ngOnInit() {
    this.dropdownToPassDocument = {label: "Validacija dokumenta", value: validacijaDokumenta};
    this.tableHeader = ["Dokaz", "Tip putnika", "Ime", "Prezime", "Datum rodjenja", "Adresa", " ", " "];
    this.getUsers();
    this.buttonName = "Show image";
    this.imageSrc = "http://wiki.tripwireinteractive.com/images/4/47/Placeholder.png";
  }

  selectDocumentStatus(event:any){
    this.documentStatus = event.target.value;
  }

  getUsers(){
    this.kontrolorService.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    });
  }

  getDocument(){
    this.kontrolorService.getDocument(this.email).subscribe(data => {
      this.imageSrc = data;
    });
  }

  OnSubmit(form: NgForm) {
    console.log("submit forme: " + this.result);
    if (this.result == "Validan")
    {
      this.status = true;
    }
    else
    {
      this.status = false;
    }

    this.kontrolorService.validateDocument(this.email, this.status).subscribe();
  }

  toggle(email:string) {
    //this.show = !this.show;
    this.show = true;
    console.log(email);
    this.email = email;
    this.getDocument();
    // if(this.show)  
    //   this.buttonName = "Hide image";
    // else
    //   this.buttonName = "Show image";
  }
}
