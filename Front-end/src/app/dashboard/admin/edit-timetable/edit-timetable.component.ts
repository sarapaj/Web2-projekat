import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinesService } from 'src/app/services/lines.service';
import { TimetableService } from 'src/app/services/timetable.service';
import { DropdownElement } from 'src/models/classes';
import { TipDana } from 'src/app/shared/constants';
import { NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-edit-timetable',
  templateUrl: './edit-timetable.component.html',
  styleUrls: ['./edit-timetable.component.css']
})
export class EditTimetableComponent implements OnInit {
  
  dropdownToPassDay: DropdownElement;
  dropdownToPassLine: DropdownElement;
  tableBody;
  selectedDay: string;
  selectedLine: string;
  showForm: boolean = false;
  showNewDepForm: boolean = false;
  selectedDeparture: string;
  canChange: boolean = false;
  newLinesDeparture: string;

  constructor(private route: ActivatedRoute,private _timetableService: TimetableService, 
    private _linesService: LinesService) {}

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

  showLineNames(){
    this._linesService.getLineNames().subscribe((res: any) =>
    {
      this.dropdownToPassLine = {
        label: "Linije",
        value: res
      }
      this.selectedLine = null;
      this.selectedDay = null;
    })
  }

  prikaziRedVoznje() {
    if(this.selectedDay == null || this.selectedLine == null){
      this.canChange = false;
      return;
    }

    this._timetableService.getTimetable(this.selectedDay, this.selectedLine).subscribe((res: any) => {
      this.tableBody = res.map(r => { return [r];})
      this.selectedDeparture = res;
      this.canChange = res.length > 0;
    })
  }

  toggleEditForm(){
    this.showForm = !this.showForm;
  }

  toggleNewDepForm(){
    this.showNewDepForm = !this.showNewDepForm;
  }

  changeDeparture(){
    if(this.selectedDay == null || this.selectedDeparture == null || this.selectedLine == null){
      this.canChange = false;
      return;
    }
    
    this._timetableService.editTimetable(this.selectedDay, this.selectedLine, this.selectedDeparture)
    .subscribe((res: any) => {
      alert("Departure update went successfully");
      this.toggleEditForm();
        
      this.selectedDay = null;
      this.selectedDeparture = null;
      this.selectedLine = null;
      this.canChange = false;

      this.tableBody = null;

    })
  }

  addDeparture(){
    if(this.selectedDay == null || this.selectedDeparture == null || this.newLinesDeparture == null){
      return;
    }

    this._timetableService.addDeparture(this.selectedDay, this.selectedLine, this.newLinesDeparture)
    .subscribe((res: any) => {
      alert("New departure is successfully added");
      this.selectedDay = null;
      this.newLinesDeparture = null;
      this.selectedLine = null;
      this.toggleNewDepForm();
    })
  }

  deleteDeparture(){
    this._timetableService.deleteTimetable(this.selectedDay, this.selectedLine)
    .subscribe((res: any) => {
      alert("Departure is susccessfully deleted");
      this.toggleEditForm();
        
      this.selectedDay = null;
      this.selectedDeparture = null;
      this.selectedLine = null;
      this.canChange = false;

      this.tableBody = null;
    })
  }
}
