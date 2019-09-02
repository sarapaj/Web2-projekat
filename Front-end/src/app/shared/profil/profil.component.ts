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
    this.userService.changeUserInfo(this.currentUser).subscribe(() =>
    {
      alert("Your profile is successfully changed");
    })
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
    this.userService.postFile(this.uploadedFile, this.uploadedFile.name, this.currentUser.Email).subscribe((data:any) => {
      alert("Image uploaded successfully");
    })
  }

  getUserInfo(){
    this.userService.getAllUserInfo().subscribe((user: any) => {
      this.currentUser.Email = (user as any).Email;
      this.currentUser.Name = (user as any).Name;
      this.currentUser.Surname = (user as any).Surname;
      this.currentUser.Address = (user as any).Address;
      this.currentUser.PassengerType = (user as any).PassengerType;
      
    })
  }

  ngOnInit() {
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

    this.getUserInfo();
    
    this.dropdownToPass = [
      {
        label: "Tip putnika",
        value: TipPutnika
      }
    ];   
  }

  PassworrdChange(form: NgForm){

  }
}

