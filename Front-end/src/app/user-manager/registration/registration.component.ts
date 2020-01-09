import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownElement } from 'src/models/classes';
import { TipPutnika } from 'src/app/shared/constants';
import { User } from 'src/models/korisnik';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User;
  dropdownToPass: DropdownElement[];
  indexField: boolean;
  pensionField: boolean;
  imageName: string = "";
  showDate: any = null;

  constructor(private router: Router, private route: ActivatedRoute, private _userService: UserService) { }

  ngOnInit() {
    this.indexField = false;
    this.pensionField = false;
    this.resetForm();
    this.dropdownToPass = [
      {
        label: "Tip putnika",
        value: TipPutnika
      }
    ];
  }

  OnSubmit(form: NgForm) {
    this.user.Birthday = new Date(this.showDate);
    this._userService.registerUser(this.user, this.imageName)
      .subscribe((data: any) => {
        alert("Registracija uspesna!");
        this.router.navigate(['/login']);
      });
  }
  
  selectPassengerChangeHandler(event:any){
    if(this.user.PassengerType == "0"){
      this.pensionField = false;
      this.indexField = true;
    }
    else if(this.user.PassengerType == "1"){
      this.indexField = false;
      this.pensionField = true;
    }
    else{
      this.indexField = false;
      this.pensionField = false;
    }
  }

  handleFileInput(event: any) {
    if(event.target.files[0].size > 4194304){
      event.target.value = "";  
      alert("File is too big!");
    }
    else{
      const file = event.target.files[0];
      this.user.Document = file;
      this.imageName = this.user.Document.name;
    }
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
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
  }

}
