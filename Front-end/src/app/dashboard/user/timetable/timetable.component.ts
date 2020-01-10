import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DropdownElement } from 'src/models/classes';
import { TimetableService } from 'src/app/services/timetable.service';
import { RedVoznjeForma } from 'src/models/red-voznje-forma';
import { NgForm } from '@angular/forms';
import { LinesService } from 'src/app/services/lines.service';
import { DayType } from 'src/app/shared/constants';

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
      label:"Days", 
      value: DayType
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
        label: "Lines",
        value: res
      }

      this.timetableForm = {
        day: DayType[0],
        lineName: res[0]
      }
    })
  }
}
