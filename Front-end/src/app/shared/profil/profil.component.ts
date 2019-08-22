import { Component, OnInit } from '@angular/core';
import { DropdownElement } from '../../../models/classes';
import { TipPutnika } from '../constants';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  uploadedFile: any = null;
  user: string;
  dropdownToPass: DropdownElement[];

  constructor(private userService: UserService) { }

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
      this.user = (claim as any).Email;
      this.userService.postFile(this.uploadedFile, this.uploadedFile.name, this.user).subscribe((data:any) => {

      })
    })
  }

  ngOnInit() {
    this.dropdownToPass = [
      {
        label: "Tip putnika",
        value: TipPutnika
      }
    ];
  }
}
