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
  // registrationForma: RegistrationForm;
  poljeIndex: boolean;
  poljePenzija: boolean;
  
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.poljeIndex = false;
    this.poljePenzija = false;
    this.resetForm();
    this.dropdownToPass = [
      {
        label: "Tip putnika",
        value: TipPutnika
      }
    ];
  }


  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
          this.router.navigate(['/dashboard']);
      });
  }

  handleFileInput(files: FileList) {
    // this.user.dokaz = files.item(0);
  }

  selectPassengerChangeHandler(event:any){
    console.log(this.user.PassangerType);
    if(this.user.PassangerType == 0){
      this.poljePenzija = false;
      this.poljeIndex = true;
    }
    else if(this.user.PassangerType == 1){
      this.poljeIndex = false;
      this.poljePenzija = true;
    }
    else{
      this.poljeIndex = false;
      this.poljePenzija = false;
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
      // Birthday: null,
      PassangerType: 2
    }
  }

}
