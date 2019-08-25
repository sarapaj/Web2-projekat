import { Component, OnInit } from '@angular/core';
import { DropdownElement } from '../../../models/classes';
import { TipPutnika } from '../constants';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/models/korisnik';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  uploadedFile: any = null;
  username: string;
  dropdownToPass: DropdownElement[];
  currentUser: User;

  constructor(private userService: UserService) { }

  OnSubmit(form: NgForm) {
    // todo
  }

  handleFileInput(event: any) {

    if(event.target.files[0].size > 4194304){
      console.log(event)
      event.target.value = "";  
      alert("File is too big!");
    }
    else{
      const file = event.target.files[0];
      this.uploadedFile = file;
    }
  }

  uploadFile(){
    this.userService.getUserClaims().subscribe((claim: any) => {
      this.username= (claim as any).Email;
      this.userService.postFile(this.uploadedFile, this.uploadedFile.name, this.username).subscribe((data:any) => {

      })
    })
  }

  ngOnInit() {
    // dovuci sve podatke user-a
    this.dropdownToPass = [
      {
        label: "Tip putnika",
        value: TipPutnika
      }
    ];
    this.currentUser = {
      Email: '',
      Password: '',
      ConfirmPassword: '',
      Name: '',
      Surname: '',
      Address: '',
      // Birthday: null,
      PassengerType: "2",
      Document: null
    }
  }
}

