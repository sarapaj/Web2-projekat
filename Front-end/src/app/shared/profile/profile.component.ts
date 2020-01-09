import { Component, OnInit } from '@angular/core';
import { DropdownElement } from '../../../models/classes';
import { TipPutnika } from '../constants';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/models/korisnik';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  uploadedFile: any = null;
  username: string;
  dropdownToPass: DropdownElement[];
  currentUser: User;
  newPassword: string = null;
  confirmNewPassword: string = null;
  currentPass: string = null;
  showDate: any = null;
  documentStatus:string;
  isDocumentAttached:boolean;
  userRole;

  constructor(private _userService: UserService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.currentUser = {
      Email: '',
      Password: '',
      ConfirmPassword: '',
      Name: '',
      Surname: '',
      Address: '',
      Birthday: null,
      PassengerType: "2",
      Document: null
    }

    
    this.userRole = localStorage.getItem('role'); // admin i kontrolor su 1 i 2

    this.getUserInfo();
    
    this.dropdownToPass = [
      {
        label: "Tip putnika",
        value: TipPutnika
      }
    ];   
  }

  checkDocument()
  {
    this._userService.checkIsDocumentValid(this.currentUser.Email).subscribe(data =>{

      this.isDocumentAttached = true;
      if(data == "Prihvacen"){
        this.documentStatus = "Prilozeni dokument je prihvacen";
      }
      else if(data == "Procesiranje"){
        this.documentStatus = "Prilozeni dokument se procesuira";

      }
      else if(data == "Odbijen"){
        this.documentStatus = "Prilozeni dokument je odbijen";

      }
      else{
        this.documentStatus = "Dokument nije prilozen";
        this.isDocumentAttached = false;
      }
    })
  }

  PassworrdChange(){
    this._userService.changePassword(this.currentPass, this.newPassword, this.confirmNewPassword)
    .subscribe((res: any) => {
      alert("Password is successfully changed");
      this.currentPass = null;
      this.newPassword = null;
      this.confirmNewPassword = null;
    },
    (err: HttpErrorResponse) => {
      alert("Password change went wrong. Try again")
      this.currentPass = null;
      this.newPassword = null;
      this.confirmNewPassword = null;
    })
  }

  
  OnSubmit(form: NgForm) {
    this.currentUser.Birthday = new Date(this.showDate);
    this._userService.changeUserInfo(this.currentUser).subscribe(() =>
    {
      alert("Your profile is successfully changed");
      this.checkDocument();
    })
  }

  handleFileInput(event: any) {

    if(event.target.files[0].size > 4194304){
      event.target.value = "";  
      alert("File is too big!");
    }
    else{
      const file = event.target.files[0];
      this.uploadedFile = file;
    }
  }

  uploadFile(){
    this._userService.postFile(this.uploadedFile, this.uploadedFile.name, this.currentUser.Email).subscribe((data:any) => {
      alert("Image uploaded successfully");
      this.isDocumentAttached = true;
    })
  }

  getUserInfo(){
    this._userService.getAllUserInfo().subscribe((user: any) => {
      this.currentUser.Email = (user as any).Email;
      this.currentUser.Name = (user as any).Name;
      this.currentUser.Surname = (user as any).Surname;
      this.currentUser.Address = (user as any).Address;
      this.currentUser.PassengerType = (user as any).PassengerType;
      this.currentUser.Password = (user as any).Password;
      this.currentUser.Birthday = (user as any).Birthday;
      this.showDate = this.datePipe.transform(this.currentUser.Birthday, 'yyyy-MM-dd');

      if(this.userRole == 0){
        this.checkDocument();
      }
    })
  }

}

