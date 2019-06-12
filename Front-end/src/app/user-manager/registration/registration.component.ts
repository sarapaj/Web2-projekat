import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DropdownElement } from 'src/app/shared/classes';
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
  
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
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
        if (data.Succeeded == true) {
          this.resetForm(form);
        }
      });
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      Email: '',
      Password: '',
      ConfirmPassword: '',
    }
  }

}
