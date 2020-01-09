import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DropdownElement } from 'src/models/classes';
import { TipRedaVoznje, TipDana, LinijePrivremeno } from 'src/app/shared/constants';
import { TimetableService } from 'src/app/services/timetable.service';
import { RedVoznjeForma } from 'src/models/red-voznje-forma';
import { NgForm } from '@angular/forms';
import { LinesService } from 'src/app/services/lines.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})

export class TimetableComponent implements OnInit {

  dropdownToPassDay: DropdownElement;
  dropdownToPassLine: DropdownElement;
  timetableForm: RedVoznjeForma;
  tableBody;
  
  
  constructor(private route: ActivatedRoute,private _redVoznjeServis: TimetableService, 
    private _linijeServis: LinesService) {}

  ngOnInit() {

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
    this.timetableForm.day = event.target.value;
  }

  selectLineChangeHandler(event:any){
    this.timetableForm.lineName =  event.target.value;
  }


  OnSubmit(form: NgForm) {
    this._redVoznjeServis.getTimetable(this.timetableForm.day, this.timetableForm.lineName).subscribe((res: any) => {
      this.tableBody = res.map(r => { return [r];})
    })
  }

  showLineNames(){
    this._linijeServis.getLineNames().subscribe((res: any) =>
    {
      this.dropdownToPassLine = {
        label: "Linije",
        value: res
      }

      this.timetableForm = {
        day: TipDana[0],
        lineName: res[0]
      }
    })
  }
}
