import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DropdownElement } from 'src/app/shared/classes';
import { TipRedaVoznje, TipDana, LinijePrivremeno } from 'src/app/shared/constants';
import { RedVoznjeService } from 'src/app/services/red-voznje.service';
import { RedVoznjeForma } from 'src/models/red-voznje-forma';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-red-voznje',
  templateUrl: './red-voznje.component.html',
  styleUrls: ['./red-voznje.component.css']
})
export class RedVoznjeComponent implements OnInit {

  dropdownToPassDay: DropdownElement;
  dropdownToPassLine: DropdownElement;
  tableHeader: string[];
  redVoznjeForma: RedVoznjeForma;
  tableBody: string[];
  
  
  constructor(
    private route: ActivatedRoute,private _redVoznjeServis: RedVoznjeService) {}

  ngOnInit() {
    this.resetForm();

    this.dropdownToPassDay = {label:"Dan", value: TipDana};
    this.dropdownToPassLine = {label:"Linije", value:LinijePrivremeno}

    this.tableHeader =["Polasci"];
    this.tableBody = ["aa", "bb"];
  }

  selectDayChangeHandler(event:any){
    this.redVoznjeForma.day = event.target.value;
  }

  selectLineChangeHandler(event:any){
    this.redVoznjeForma.lineName =  event.target.value;
  }


  OnSubmit(form: NgForm) {
    this._redVoznjeServis.getRedVoznje(this.redVoznjeForma);
    this.tableBody = this._redVoznjeServis.list;
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.redVoznjeForma = {
      day: '',
      lineName: '',
    }
  }
}
