import { Component, OnInit } from '@angular/core';
import { KontrolorService } from 'src/app/services/kontrolor.service';
import { UserKontrolor } from 'src/models/user-kontrolor';
import { DropdownElement } from 'src/models/classes';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

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
  imageUrl;

  constructor(private kontrolorService:KontrolorService, private sanitizer:DomSanitizer) { }

  ngOnInit() {
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

  mystring;
  getDocument(){
    this.kontrolorService.getDocument(this.email).subscribe((data:string) => {
      let objectURL = `data:image/jpeg;base64,${data}`
      // objectURL = data.slice(1,data.length);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
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
    this.getUsers();
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
