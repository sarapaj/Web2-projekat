import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinijeService } from 'src/app/services/linije.service';
import { RedVoznjeService } from 'src/app/services/red-voznje.service';
import { DropdownElement } from 'src/models/classes';
import { TipDana } from 'src/app/shared/constants';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-uredi-red-voznje',
  templateUrl: './uredi-red-voznje.component.html',
  styleUrls: ['./uredi-red-voznje.component.css']
})
export class UrediRedVoznjeComponent implements OnInit {
  
  dropdownToPassDay: DropdownElement;
  dropdownToPassLine: DropdownElement;
  tableBody;
  selectedDay: string;
  selectedLine: string;
  showForm: boolean = false;
  selectedDeparture: string;

  constructor(private route: ActivatedRoute,private _redVoznjeServis: RedVoznjeService, 
    private _linijeServis: LinijeService) {}

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
    this._linijeServis.getLineNames().subscribe((res: any) =>
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
      return;
    }

    this._redVoznjeServis.getRedVoznje(this.selectedDay, this.selectedLine).subscribe((res: any) => {
      this.tableBody = res.map(r => { return [r];})
      this.selectedDeparture = res;
    })
  }

  toggleEditForm(){
    this.showForm = !this.showForm;
    this.selectedDay = null;
    this.selectedDeparture = null;
    this.selectedLine = null;
  }

  changeDeparture(){
    if(this.selectedDay == null || this.selectedDeparture == null || this.selectedLine == null){
      return;
    }
    
    this._redVoznjeServis.editRedVoznje(this.selectedDay, this.selectedLine, this.selectedDeparture)
    .subscribe((res: any) => {
      alert("Departure update went successfully");
      this.toggleEditForm();
    })
  }
}
