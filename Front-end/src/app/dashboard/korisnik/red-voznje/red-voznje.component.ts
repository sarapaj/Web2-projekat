import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DropdownElement } from 'src/models/classes';
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
  redVoznjeForma: RedVoznjeForma;
  tableBody;
  
  
  constructor(private route: ActivatedRoute,private _redVoznjeServis: RedVoznjeService, 
    private _linijeServis: LinijeService) {}

  ngOnInit() {
    this.resetForm();

    this.dropdownToPassDay = {
      label:"Dani", 
      value: TipDana
    };

    this.dropdownToPassLine = 
      {
        label: "",
        value: []
      };

      this.showLineNames();
  }

  selectDayChangeHandler(event:any){
    this.redVoznjeForma.day = event.target.value;
  }

  selectLineChangeHandler(event:any){
    this.redVoznjeForma.lineName =  event.target.value;
  }


  OnSubmit(form: NgForm) {
    this._redVoznjeServis.getRedVoznje(this.redVoznjeForma.day, this.redVoznjeForma.lineName).subscribe((res: any) => {
      this.tableBody = res.map(r => { return [r];})
    })
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
