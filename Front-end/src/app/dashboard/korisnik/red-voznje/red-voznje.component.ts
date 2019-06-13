import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DropdownElement } from 'src/app/shared/classes';
import { TipRedaVoznje, TipDana, LinijePrivremeno } from 'src/app/shared/constants';
import { RedVoznjeService } from 'src/app/services/red-voznje.service';
import { RedVoznjeForma } from 'src/models/red-voznje-forma';
import { NgForm } from '@angular/forms';
import { LinijeService } from 'src/app/services/linije.service';

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
  tableBody;
  
  
  constructor(
    private route: ActivatedRoute,private _redVoznjeServis: RedVoznjeService, private _linijeServis: LinijeService) {}

  ngOnInit() {
    this.resetForm();

    this.dropdownToPassDay = {label:"Dani", value: TipDana};
    // this.dropdownToPassLine = {label:"Linije", value:LinijePrivremeno}

    this.dropdownToPassLine = 
      {
        label: "",
        value: []
      };

      this.showLineNames();

    this.tableHeader =["Polasci"];
    //this.tableBody = [["aa"], ["bb"]];

  }

  selectDayChangeHandler(event:any){
    // console.log(event.target.value);
    this.redVoznjeForma.day = event.target.value;
  }

  selectLineChangeHandler(event:any){
    this.redVoznjeForma.lineName =  event.target.value;
  }


  OnSubmit(form: NgForm) {
    // console.log(this.redVoznjeForma);

    this._redVoznjeServis.getRedVoznje(this.redVoznjeForma).subscribe((res: any) => {
      this.tableBody = res.map(r => { return [r];})
    })
    // console.log(this._redVoznjeServis.list);
    // this.tableBody = [this._redVoznjeServis.list];
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.redVoznjeForma = {
      day: TipDana[0],
      lineName: LinijePrivremeno[0]
    }
  }

  showLineNames(){
    this._linijeServis.getLineNames().subscribe((res: any) =>
    {
      this.dropdownToPassLine = {
        label: "Linije",
        value: res
      }
    })
  }
}
